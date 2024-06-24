document.getElementById('setting-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const server_url = document.getElementById('server_url').value;
    chrome.storage.sync.set({ server_url: server_url }, function () {
        alert("done");
    })



    console.log(server_url);



});