from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
    username='Demo',
    display_name='Demo User',
    email='demo@aa.io',
    profile_pic='https://i.imgur.com/ClsTg0d.jpg',
    bio='Hello, I am a demo user.',
    password='password'
    )
    marnie = User(
    username='marnie',
    display_name='Marnie User',
    email='marnie@aa.io',
    profile_pic='https://i.imgur.com/VHycDBK.jpg',
    bio='Nice to meet you! I am Marnie.',
    password='password'
    )
    bobbie = User(
    username='bobbie',
    display_name='Bobbie User',
    email='bobbie@aa.io',
    profile_pic='https://i.imgur.com/e7qOdel.jpg',
    bio='Hey there! I am Bobbie.',
    password='password'
    )
    alice = User(
        username='alice',
        display_name='Alice User',
        email='alice@example.com',
        profile_pic='https://i.imgur.com/ytGBVAF.jpg',
        bio='Hi, I am Alice. Nice to connect with you!',
        password='password'
    )
    bob = User(
        username='bob',
        display_name='Bob User',
        email='bob@example.com',
        profile_pic='https://i.imgur.com/STnK2tv.jpg',
        bio='Hello everyone! I am Bob.',
        password='password'
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(bob)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
