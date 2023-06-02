from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

# Function to seed messages
def seed_messages():
    # Define your seed data for messages
    seed_data = [
        {'message': 'First message in Channel 1', 'user_id': 1, 'channel_id': 1},
        {'message': 'Second message in Channel 1', 'user_id': 1, 'channel_id': 1},
        {'message': 'First message in Channel 3', 'user_id': 1, 'channel_id': 3},
        {'message': 'First message in Channel 5', 'user_id': 1, 'channel_id': 5},
        {'message': 'First message in Channel 1 from User 2', 'user_id': 2, 'channel_id': 1},
        {'message': 'First message in Channel 2 from User 2', 'user_id': 2, 'channel_id': 2},
        {'message': 'First message in Channel 4 from User 2', 'user_id': 2, 'channel_id': 4},
        {'message': 'First message in Channel 1 from User 3', 'user_id': 3, 'channel_id': 1},
        {'message': 'First message in Channel 3 from User 3', 'user_id': 3, 'channel_id': 3},
        {'message': 'First message in Channel 4 from User 3', 'user_id': 3, 'channel_id': 4},
        {'message': 'First message in Channel 1 from User 4', 'user_id': 4, 'channel_id': 1},
        {'message': 'First message in Channel 5 from User 4', 'user_id': 4, 'channel_id': 5},
        {'message': 'First message in Channel 1 from User 5', 'user_id': 5, 'channel_id': 1},
        {'message': 'First message in Channel 2 from User 5', 'user_id': 5, 'channel_id': 2},
        {'message': 'First message in Channel 4 from User 5', 'user_id': 5, 'channel_id': 4}
    ]

    # Create Message objects from the seed data and add them to the database
    for data in seed_data:
        message = Message(**data)
        db.session.add(message)

    db.session.commit()


def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
