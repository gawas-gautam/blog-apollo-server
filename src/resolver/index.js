const { gql } = require('apollo-server');
const db =  require('../database'); 
const { Op } = require("sequelize");
const post_category =require('../models/post_category.js');

const typeDefs = gql`
    type Query {
      posts: [Post]
      post(id: ID!): Post
      categories: [Category]
      singlecategoryposts(id: ID!) : singlecategoryposts
    }
    type Post {
      id: ID!
      user_id: Int
      title: String
      body: String
      image: String
    }
    type Category {
      id: ID!
      category_name: String
    }
    type singlecategoryposts{
      id: ID!
      category_name: String
      posts: [Post]
    }
`;

const get_posts = async() => {
  const data = await db.posts.findAll();
  return data.map(({dataValues}) => ({
      id: dataValues.id,
      user_id: dataValues.user_id,
      title: dataValues.title,
      body: dataValues.body,
      image: dataValues.image
  }))

}

const resolvers = {
    Query: {
        posts: () => get_posts(),
        post: async (obj, args, context, info) =>{
            const data = await db.posts.findByPk(args.id);
            return data['dataValues']
        },
        categories: async () =>{
            const data = await db.category.findAll();
            return data.map(({dataValues}) => ({
              id: dataValues.id,
              category_name: dataValues.name
            }))
        },
        singlecategoryposts: async (obj, args, context, info) =>{
            const category_data = await db.category.findByPk(args.id);

            // const posts = await db.posts.findAll({
            //     include: [{
            //         model: post_category,
            //         where: { category_id: args.id}
            //     }]
            // })
            // console.log(posts)
            const post_category_data = await db.post_category.findAll({
              attributes:['post_id'],
              where: {
                category_id: args.id
              }
            });
            
            const post_ids = post_category_data.map(({dataValues}) => dataValues.post_id);
            const posts = async() => {
              const data = await db.posts.findAll({
                where: {
                  id: {
                    [Op.in]: post_ids
                  }
                }
              });
              console.log(data)
              return data.map(({dataValues}) => ({
                  id: dataValues.id,
                  user_id: dataValues.user_id,
                  title: dataValues.title,
                  body: dataValues.body,
                  image: dataValues.image
              }))
            }    
            let final_data = {
              'id': args.id,
              'category_name': category_data.dataValues.name,
              'posts': posts
            }
            return final_data
        },
    },
};

module.exports = {typeDefs, resolvers}