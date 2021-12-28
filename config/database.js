import mongoose from 'mongoose'

const URI = process.env.MONGODB_URL 

mongoose.connect(`mongodb+srv://shahsajib:WFcUKym8s67480C7@cluster0.ssqm7.mongodb.net/shah-commerce?retryWrites=true&w=majority`, (err) => {
  if(err) throw err;
  console.log('Mongodb connection')
})