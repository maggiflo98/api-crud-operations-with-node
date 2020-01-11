const express = require('express');
const app = express();
// middleware this was for the put method
app.use(express.json());


const songs=[
    
        {id:1,name:"RnB"},
        {id:2,name:"Rock"},
        {id:3,name:"House"},
    
];

app.get('/',function(req,res){
    res.send('hello world')

});
// get all songs
app.get('/api/songs',(req,res)=>{
res.send(songs);
})

// get a single song

app.get('/api/songs/:id',function(req,res){
    // to ensure id of the song exists
 const song= songs.find( s=>s.id==parseInt(req.params.id));
 if(!song)res.status(404).send('song is not found');
 res.send(song);
});
            //  *parse int is to change A STRING to an Integer
            // add parameters to an api
            // app.get('/api/posts/:year',( req,res) => {
            //     res.send(req.params.year)

            // });

            // app.get('/api/songs/:id',(req,res) => {
            //   res.send(req.params.id)
            // });

// delete song
app.delete('/api/songs/:id',(req,res)=>{
    const song=songs.find(s=>s.id===parseInt(req.params.id));
    if(!song)
    return res.status(404).send('delete a song that does not exist');
   
      const index=songs.indexOf(song);
      songs.splice(index,5)
      res.send(song);

});
// add song
app.post('/api/songs',(req,res)=>{
    const song={
        id:songs.length + 1,
        name:req.body.name
    };
    songs.push(song);
    res.send(song)

});

// update song
app.put('/api/songs/:id',(req,res)=>{
    // looking for the song
    const song=songs.find(s=>s.id===parseInt(req.params.id));
    if(!song)res.status(404).send('cannot update a song that does not exist');
    // return the updated song
    song.name= req.body.name
    res.send(song);
});

// const port = Process.env.port
app.listen(8000,()=>
  console.log("port working on port 8000 ")
);