type="text/babel"

document.addEventListener("DOMContentLoaded",event => {
    console.dir(("DOM loaded Console Test"))


    let url = 'https://graphql.anilist.co';
    let xhr = new XMLHttpRequest();
    let APIData = null;
    let error = null;

    let textBox = document.getElementById("textBOX");

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
        } } } `;
    let RequestVariables = {
        search: "Fate/Zero",
        page: 2,
        perPage: 6
    };

    let requestBody = JSON.stringify({
        query: query,
        variables: RequestVariables
    });
    console.dir(requestBody)

    xhr.open("POST",url,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(requestBody);

    /*takes API json and Displays it onto page */
    function pageParse(RawJson){
        let pData = RawJson.data.Page.media;
        let ToDisplay = "";

        for (const media of pData){
            const NewNode = document.createElement("div");
            NewNode.classList.add("bg-red-500");

            ToDisplay += ("Media ID: " + media.id + "\n");
            ToDisplay += ("Title (Romaji): " + media.title.romaji + "\n");

        }

        textBox.innerText = ToDisplay;
        console.dir(pData);
    }
    function card(media,title){
        const element = (
        <div>
            <div>media </div>
            <div> </div>
        </div>)

        textBox.render(element);
    }

    /*Handles API json and What to do with it */
    xhr.onreadystatechange = function (){
        if(this.readyState === XMLHttpRequest.DONE){
            if (this.status == "200") { // if response from server is good
                APIData = JSON.parse(this.responseText);
                console.dir(APIData);

                textBox.innerText = JSON.stringify(APIData)
                pageParse(APIData)
            } else {
                error = this.statusText;
                console.dir(error)
            }
        }
    }



});