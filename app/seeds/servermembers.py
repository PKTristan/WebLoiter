from app.models import db, ServerMembers, environment, SCHEMA
from sqlalchemy.sql import text


def seed_server_members():
    demo = ServerMembers(
        member_id = 1,
        server_id = 4
    )
    demo3 = ServerMembers(
        member_id = 1,
        server_id = 1
    )
    demo2 = ServerMembers(
        member_id = 1,
        server_id = 3
    )
    marnie3 = ServerMembers(
        member_id = 2,
        server_id = 5
    )
    marnie = ServerMembers(
        member_id = 2,
        server_id = 1
    )
    marnie2 = ServerMembers(
        member_id = 2,
        server_id = 2
    )
    bobbie3 = ServerMembers(
        member_id = 3,
        server_id = 6
    )
    bobbie = ServerMembers(
        member_id = 3,
        server_id = 1
    )
    bobbie2 = ServerMembers(
        member_id = 3,
        server_id = 3
    )
    alice2 = ServerMembers(
        member_id = 4,
        server_id = 7
    )
    alice = ServerMembers(
        member_id = 4,
        server_id = 1
    )
    alice3 = ServerMembers(
        member_id = 4,
        server_id = 2
    ) 
    bob = ServerMembers(
        member_id = 5,
        server_id = 8
    )
    bob2 = ServerMembers(
        member_id = 5,
        server_id = 2
    )
    bob3 = ServerMembers(
        member_id = 5,
        server_id = 3
    )

    db.session.add(demo)
    db.session.add(demo3)
    db.session.add(demo2)
    db.session.add(marnie)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(bobbie)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.add(alice)
    db.session.add(alice2)
    db.session.add(alice3)
    db.session.add(bob)
    db.session.add(bob2)
    db.session.add(bob3)
    db.session.commit()



def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.Servermembers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Servermembers"))

    db.session.commit() 