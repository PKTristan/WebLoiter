from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerMembers, Channel, db
from app.forms import ServerForm


server_routes = Blueprint('servers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@server_routes.route("/<id>")
@login_required
def get_server(id):
    server = Server.query.get(id)
    return jsonify(server.to_dict())

@server_routes.route("", methods=["GET"])
@login_required
def get_servers():
    servers = Server.query.order_by(Server.direct_message == True).all()
    servers_dict = [server.to_dict() for server in servers]
    return jsonify(servers_dict)

@server_routes.route("/server_members")
@login_required
def get_server_members():
    members = ServerMembers.query.all()
    return jsonify([member.to_dict() for member in members])


@server_routes.route("", methods=["GET", "POST"])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            server_name=form.data['server_name'],
            owner_id=current_user.id,
            server_type=form.data['server_type'],
            avatar=form.data['avatar'],
            server_details=form.data['server_details'],
            private=form.data['private'],
            direct_message=form.data['direct_message']
        )
        db.session.add(server)
        db.session.commit()
        return jsonify(server.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<id>", methods=["PUT", "GET"])
@login_required
def update_server(id):

    form = ServerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(id)
        if not server:
            return {'errors': 'Server does not exist'}, 404
        
        if server.owner_id != current_user.id:
            return {'errors': 'You are not the owner of this server'}, 401
        
        server.server_name = form.data['server_name']
        server.server_type = form.data['server_type']
        server.avatar = form.data['avatar']
        server.server_details = form.data['server_details']
        server.private = form.data['private']
        server.direct_message = form.data['direct_message']

        db.session.commit()

        return jsonify(server.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<id>", methods=["DELETE"])
@login_required
def delete_server(id):
    server = Server.query.get(id)
    if not server:
        return {'errors': 'Server does not exist'}, 404
    if server.owner_id != current_user.id:
        return {'errors': 'You are not the owner of this server'}, 401
    
    db.session.delete(server)
    db.session.commit()
    return {'message': 'Server deleted'} 



@server_routes.route("/<id>/channels", methods=["GET"])
@login_required
def get_server_channels(id):
    server = Server.query.get(id)
    if not server:
        return {'errors': 'Server does not exist'}, 404

    channels = Channel.query.filter(Channel.server_id == id).all()
    channel_list = [channel.to_dict() for channel in channels]

    return jsonify({"Server": {
        "id": server.id,
        "server_name": server.server_name,
        "owner_id": server.owner_id,
        "server_type": server.server_type,
        "Channels": channel_list
    }})