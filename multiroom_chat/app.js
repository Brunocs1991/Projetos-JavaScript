//importar as configurações do servidor
var app = require('./config/server');

//Parametrizando porta de escuta
var server = app.listen(80, () => {
    console.log('Servidor online')
});

var io = require('socket.io')(server);
app.set('io', io)
io.on('connection', (socket) =>{
    console.log('Usuário conectou');
    socket.on('disconnect',()=>{
        console.log("Usuário desconectou");
    });
    /*dialogo*/
    socket.on('msgParaServidor',(data)=>{
        socket.emit('msgParaCliente', 
        {
            apelido: data.apelido, 
            mensagem: data.mensagem
        });
        socket.broadcast.emit('msgParaCliente', 
        {
            apelido: data.apelido, 
            mensagem: data.mensagem
        });
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            /*participantes*/
            socket.emit('participantesParaCliente', 
            {
                apelido: data.apelido
            });
            socket.broadcast.emit('participantesParaCliente', 
            {
                apelido: data.apelido
            });
        }        
    });
});
