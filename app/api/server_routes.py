from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerMembers, db
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

@server_routes.route("")
@login_required
def get_servers():
    servers = Server.query.all()
    return jsonify([server.to_dict() for server in servers])

@server_routes.route("/server_members")
@login_required
def get_server_members():
    """
    Retrieves all members of the server from the database, and returns
    """
    members = ServerMembers.query.all()
    return jsonify([member.to_dict() for member in members])


@server_routes.route("", methods=["GET", "POST"])
@login_required
def create_server():
    """
    Creates a server with the given name, owner ID, type, avatar, details, privacy settings, and direct message flag.
    Returns a JSON response containing the dictionary representation of the created server.
    """
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