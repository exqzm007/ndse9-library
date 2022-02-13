const { Server } = require("socket.io");
const Book = require("../models/Book");

function startSocket(httpServer) {
  if (!httpServer) return;
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log('a user connected');

    try {
      const { bookId } = socket.handshake.query;
      if (bookId) {
        const bookToUpdate = await Book.findById(bookId);
        socket.join(bookId);
    
        socket.on("book-comment", async (data) => {
          bookToUpdate.comments.push(data);
          await bookToUpdate.save();
          socket.to(bookId).emit("book-comment", data);
          socket.emit("book-comment", data);
        })
    
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      } else {
        socket.disconnect();
      }
    } catch (e) {
      socket.disconnect();
      console.error(e);
    }
  });
};

module.exports = startSocket;