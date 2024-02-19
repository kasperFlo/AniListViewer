document.addEventListener("DOMContentLoaded",event => {
    console.dir(("8==> test"))
    let query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
                  total
                  currentPage
                  lastPage
                  hasNextPage
                  perPage
            }
        media (id: $id, search: $search) {
          id
          title {
            romaji
          }
        }
      }
    }
`;
    let variables = {
        search: "Fate/Zero",
        page: 2,
        perPage: 6
    };
    let payload = JSON.stringify({
        query: query,
        variables: variables
    });

    let url = 'https://graphql.anilist.co';
    let xhr = new XMLHttpRequest();

    let data = null;
    let error = null;

    let textBox = document.getElementById("textBOX");

    xhr.open("POST",url,true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(payload);

    xhr.onreadystatechange = function (){
        if(this.readyState === XMLHttpRequest.DONE){
            if (this.status == "200") { // if response from server is good
                data = JSON.parse(this.responseText);
                console.dir(data);

                textBox.innerText = JSON.stringify(data)
                pageParse(data)
            } else {
                error = this.statusText;
                console.dir(error)
            }
        }
    }

    function pageParse(data){
        let pData = data.data.Page.media;
        let thing = "";

        pData.forEach(function(media){
            thing+=("Media ID: " + media.id + "\n");
            thing+=("Title (Romaji): " + media.title.romaji + "\n");
        })

        textBox.innerText = thing;

        console.dir(pData);
    }


});