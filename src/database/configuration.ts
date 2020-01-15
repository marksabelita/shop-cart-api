import * as mongoose from 'mongoose';

const credentials =  {
  local: {
    username: 'markmark',
    password: '123mark',
    link: 'ds263448.mlab.com:63448/ecom'
  },
  test: {
    username: 'testtest',
    password: '123test',
    link: 'ds361768.mlab.com:61768/dbtest'
  }
}

export async function DBConnect(env: string = 'local'){
  const { username, password, link } = credentials[env]; 
  const URL = `mongodb://${username}:${password}@${link}`
  
  return await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}