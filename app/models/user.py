from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    display_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.String(1000), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @db.validates('email')
    def validate_email(self, key, email):
        if not validate_email_format(email):
            raise AssertionError('Invalid email format')
        return email

    @db.validates('profile_pic')
    def validate_avi(self, key, avi):
        if not validate_url_format(avi):
            raise AssertionError('Invalid URL format for profile_pic')
        return avi

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }



def validate_email_format(email) -> bool:
    # check for valid email
    return True

def validate_url_format(url) -> bool:
    # check fro proper url
    return True
