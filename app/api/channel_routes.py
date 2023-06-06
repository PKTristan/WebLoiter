from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, ChannelMembers, Channel, Server

channel_routes = Blueprint('channels', __name__, url_prefix='/channels')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def is_owner(server_id) -> bool:
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'server_error': 'No server found'}), 404

    owner_id = server.owner_id

    if owner_id == current_user.id:
        return jsonify({'auth_error': "Authorization failed. You don't have the permission to make this rerquest."}), 403

    return True


@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    server_id = request.json.get('server_id')
    if server_id is None:
        return jsonify({'request_error': 'no server_id given'}), 400

    channel_name = request.json.get('channel_name')
    if channel_name is None:
        return jsonify({'request_error': 'no channel_name is given'}), 400

    if is_owner(server_id):
        new_channel = Channel(server_id=server_id, channel_name=channel_name)

        db.session.add(new_channel)
        db.session.commit()

        return jsonify(new_channel.to_dict()), 201


@channel_routes.route("/<int:id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def get_edit_delete_channel(id):
    channel = Channel.query.get(id)
    method = request.method

    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    if method == 'GET':
        return jsonify(channel.to_dict())

    server_id = channel.server_id

    if is_owner(server_id):
        message = None
        if method == 'PUT':
            channel_name = request.json.get('channel_name')
            if channel_name is None:
                return jsonify({'request_error': 'no channel_name is given'}), 400

            channel.channel_name = channel_name
            message = channel.to_dict()
        elif method == 'DELETE':
            db.session.delete(channel)
            message = {'message': 'Channel deleted successfully'}


        db.session.commit()

        return jsonify(message), 200
