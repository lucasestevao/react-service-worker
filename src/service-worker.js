addEventListener("message", ({ data, source: { id } }) => {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      console.log(client);
      if (client.id !== id) client.postMessage(data);
    });
  });
});
