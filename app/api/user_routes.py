from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from app.forms import SignUpForm
from app import db

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/signup', methods=['POST'])
# def signup():
#     form = SignUpForm() #Instantiate the Signup form

#     data = request.get_json()

#     #Check if the form data is valid
#     if form.validate_on_submit():
#         username = form.username.data
#         password = form.password.data
#         display_name = form.display_name.data
#         email = form.email.data

#         #Check if username is available
#         existing_user = User.query.filter_by(username=username).first()
#         if existing_user:
#             return jsonify({'error': "Username already exists."}), 400
#         #Check is email is in use
#         existing_email = User.query.filter_by(email=email).first()
#         if existing_email:
#             return jsonify({'error': 'Email is already in use.'}), 400

#         new_user = User(username=username, password=password, display_name=display_name, email=email)

#         db.session.add(new_user)
#         db.session.commit()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
