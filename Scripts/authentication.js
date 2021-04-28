let userdata = {
    users: [
      {
        id: 1,
        name: 'john',
        hobby: 'coding'
      },
      {
        id : 2,
        name: 'Wura',
        hobby: 'ptewe'
      },
      {
        id: 3,
        name: 'Steve',
        hobby: 'wahala'
      },
    ]
  }


let name = 'Steve'
let hobby = 'wahala'

if (name === userdata.users[name]){
    console.log('Yes')
}


let result = ( name === userdata.users[name] ) ? 'Found' : 'Not Found'
console.log(result)