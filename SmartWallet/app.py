from flask import Flask
from flask_graphql import GraphQLView
import graphene
from graphqlbackend import Query
from flask_cors import CORS, cross_origin
import os
import dblayer
import sys 
sys.path.append(".")

view_function = GraphQLView.as_view('graphql', schema=graphene.Schema(query=Query), graphiql=True)

application = Flask(__name__)
cors = CORS(application)
application.config['CORS_HEADERS'] = 'Content-Type'
application.add_url_rule('/graphql', view_function=view_function)

if __name__ == "__main__":
    application.run(host='0.0.0.0')