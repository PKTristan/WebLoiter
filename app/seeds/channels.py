from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


#adds seeders for channels
def seed_channels():
    game_haven_general = Channel(
        channel_name='general',
        server_id=1
    )
    otaku_club_general = Channel(
        channel_name='general',
        server_id=2
    )
    mma_warriors_general = Channel(
        channel_name='general',
        server_id=3
    )
    botw = Channel(
        channel_name='BOTW',
        server_id=1
    )
    ouran = Channel(
        channel_name='ouran-host-club',
        server_id=2
    )
    db.session.add(game_haven_general)
    db.session.add(otaku_club_general)
    db.session.add(mma_warriors_general)
    db.session.add(botw)
    db.session.add(ouran)
    db.session.commit()


def undo_channels():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
