"""create-db

Revision ID: 6c72b3322be4
Revises: 
Create Date: 2023-06-10 09:40:02.843767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c72b3322be4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('display_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profile_pic', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.String(length=1000), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('server_name', sa.String(length=25), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('server_type', sa.String(), nullable=False),
    sa.Column('avatar', sa.String(length=40), nullable=True),
    sa.Column('server_details', sa.String(length=100), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=True),
    sa.Column('direct_message', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='fk_servers_owner_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('channel_name', sa.String(length=50), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], name='fk_channels_server_id_servers', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('servermembers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=True),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['member_id'], ['users.id'], name='fk_servermembers_member_id_users', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], name='fk_servermembers_server_id_servers', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('channelmembers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=True),
    sa.Column('channel_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], name='fk_channelmembers_channel_id_channels', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['member_id'], ['users.id'], name='fk_channelmembers_member_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=2000), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('channel_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], name='fk_messages_channel_id_channels', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_messages_user_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('channelmembers')
    op.drop_table('servermembers')
    op.drop_table('channels')
    op.drop_table('servers')
    op.drop_table('users')
    # ### end Alembic commands ###