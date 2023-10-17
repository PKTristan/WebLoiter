from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

# Function to seed messages
def seed_messages():
    # Define your seed data for messages
    seed_data = [
        {'message': 'Hi or should I say', 'user_id': 1, 'channel_id': 1},
        {'message': 'Hello there...', 'user_id': 1, 'channel_id': 1},
        {'message': 'Any fun plans?', 'user_id': 1, 'channel_id': 3},
        {'message': 'Any starwars fans here?', 'user_id': 1, 'channel_id': 5},
        {'message': 'Thanks for letting me join!', 'user_id': 2, 'channel_id': 1},
        {'message': 'Thanks for the invite!', 'user_id': 2, 'channel_id': 2},
        {'message': 'Thanks for joining!', 'user_id': 2, 'channel_id': 4},
        {'message': 'General Kenobi!', 'user_id': 3, 'channel_id': 1},
        {'message': 'Did anyone catch the fight last night', 'user_id': 3, 'channel_id': 3},
        {'message': 'Who has tried the new Mortal Kombat?', 'user_id': 3, 'channel_id': 4},
        {'message': 'I Love starwars!!!', 'user_id': 4, 'channel_id': 1},
        {'message': 'Is water wet?', 'user_id': 4, 'channel_id': 5},
        {'message': 'I love pepperoni pizza!', 'user_id': 5, 'channel_id': 1},
        {'message': 'I am so excited for the new COD', 'user_id': 5, 'channel_id': 2},
        {'message': 'I am finally playing the new Zelda game, whoop!', 'user_id': 5, 'channel_id': 4}
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
