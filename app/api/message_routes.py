from flask import Blueprint, jsonify, session, request, g
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Message, db


message_routes = Blueprint('message_routes', __name__, url_prefix='/channels/<int:channel_id>/messages')

@message_routes.route('/', methods=['GET', 'POST'])
def channel_messages(channel_id):
    if request.method == 'GET':
        #Get all messages in the channel
        channel_messages = Message.query.filter_by(channel_id=channel_id).all()
        all_messages = [
            {
                'id': message.id,
                'message': message.message,
                'user_id': message.user_id,
                'channel_id': message.channel_id
            }
            for message in channel_messages
        ]

        return jsonify(all_messages), 200
    
    
    elif request.method == "POST":
        #Create a new message in the channel
        data = request.get_json()
        print('this is data ', data)

        user_id = current_user.id
        message = Message(
            message=data['message'],
            user_id=user_id,
            channel_id=channel_id
        )
        #Save the new message to db
        print('this is message ', message)
        db.session.add(message)
        db.session.commit()

        created_message = {
            'id': message.id,
            'message': message.message,
            'user_id': message.user_id,
            'channel_id': message.channel_id
        }

        return jsonify(created_message), 201

@message_routes.route('/<int:message_id>', methods=['PUT', 'DELETE'])
def update_channel_message(channel_id, message_id):
    if request.method == 'PUT':
        message = Message.query.filter_by(id=message_id, channel_id=channel_id).first()

        if message:
            data = request.get_json()
            message.message = data['message']

            db.session.commit()

            updated_message = {
                'id' : message.id,
                'message': message.message,
                'user_id': message.user_id,
                'channel_id': message.channel_id
            }

            return jsonify(updated_message), 200
        else: 
            return jsonify({'error': "Message not found"}), 404
        

    elif request.method == 'DELETE':
        message = Message.query.filter_by(id=message_id, channel_id=channel_id).first()

        if message:
            db.session.delete(message)
            db.session.commit()

            return jsonify({'message': 'Message deleted'}), 200
        else: 
            return jsonify({'error': 'Message not found'}), 404

