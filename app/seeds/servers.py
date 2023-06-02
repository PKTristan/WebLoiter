from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    game_haven = Server(
        server_name='GameHaven',
        owner_id=1,
        server_type='Gaming',
        avatar='https://i.imgur.com/VVcDZUp.jpg',
        server_details='A paradise for gamers of all genres.',
        private=True,
        direct_message=False
    )
    otaku_club = Server(
        server_name='OtakuClub',
        owner_id=5,
        server_type='Anime',
        avatar='https://i.imgur.com/w3UJSjm.jpg',
        server_details='A community of anime enthusiasts.',
        private=True,
        direct_message=False
    )
    mma_warriors = Server(
        server_name='MMAWarriors',
        owner_id=3,
        server_type='Sports',
        avatar='https://i.imgur.com/mpZv7aK.jpg',
        server_details='A hub for MMA fans and fighters.',
        private=True,
        direct_message=False
    )
    demos_server = Server(
        server_name='demoserver',
        owner_id=1,
        server_type='Direct Message',
        avatar='https://i.imgur.com/4d2kR0m.jpg',
        server_details=None,
        private=True,
        direct_message=True
    )
    marnies_server = Server(
        server_name='marniesserver',
        owner_id=2,
        server_type='Direct Message',
        avatar='https://i.imgur.com/4d2kR0m.jpg',
        server_details=None,
        private=True,
        direct_message=True
    )
    bobbies_server = Server(
        server_name='bobbysserver',
        owner_id=3,
        server_type='Direct Message',
        avatar='https://i.imgur.com/4d2kR0m.jpg',
        server_details=None,
        private=True,
        direct_message=True
    )
    alices_server = Server(
        server_name='aliceserver',
        owner_id=4,
        server_type='Direct Message',
        avatar='https://i.imgur.com/4d2kR0m.jpg',
        server_details=None,
        private=True,
        direct_message=True
    )
    bobs_server = Server(
        server_name='bobsserver',
        owner_id=5,
        server_type='Direct Message',
        avatar='https://i.imgur.com/4d2kR0m.jpg',
        server_details=None,
        private=True,
        direct_message=True
    )
    db.session.add(game_haven)
    db.session.add(otaku_club)
    db.session.add(mma_warriors)
    db.session.add(demos_server)
    db.session.add(marnies_server)
    db.session.add(bobbies_server)
    db.session.add(alices_server)
    db.session.add(bobs_server)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()