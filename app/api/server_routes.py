from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerMembers, db


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
    members = ServerMembers.query.all()
    return jsonify([member.to_dict() for member in members])


