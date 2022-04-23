if(process.env.NODE_ENV==="production"){
  app.use(express.static("../frontend/build"));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
   
}

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>console.log (`Escuchando el puerto 5000`));
