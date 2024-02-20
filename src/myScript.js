document.addEventListener("DOMContentLoaded", event => {
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
        page: 4,
        perPage: 6
    };

    let requestBody = JSON.stringify({
        query: query,
        variables: RequestVariables
    });
    console.dir("printing request body\n -->" + requestBody)


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(requestBody);

    /*takes API json and Displays it onto page */
    // function pageParse(RawJson) {
    //     let pData = RawJson.data.Page.media;
    //     textBox.innerText = ""; // Clear existing content
    //
    //     const cardElements = pData.map((media) => {
    //         return (
    //             <div className='card m-2 w-2/5 flex flex-row justify-center grid grid-cols-6'>
    //                 <div className='p-3 col-span-2'>Media ID: {media.id}</div>
    //                 <div className='p-3 col-span-3'>Title (Romaji): {media.title.romaji}</div>
    //             </div>
    //         );
    //     });
    //
    //     textBox.append(...cardElements); // Append all cards at once
    // }
    function pageParse(RawJson) {
        let pData = RawJson.data.Page.media;
        let ToDisplay = "";
        textBox.innerText = "";

        for (const media of pData) {
            const card = document.createElement('div');
            card.className = 'card m-2 w-2/5 flex flex-row justify-center grid grid-cols-6';

            const mediaIdDiv = document.createElement('div');
            mediaIdDiv.className = 'p-3 col-span-2';
            mediaIdDiv.textContent = `Media ID: ${media.id}`;

            const titleDiv = document.createElement('div');
            titleDiv.className = ('p-3 col-span-3');
            titleDiv.textContent = `Title (Romaji): ${media.title.romaji}`;

            card.appendChild(mediaIdDiv);
            card.appendChild(titleDiv);

            textBox.appendChild(card);
        }
    }


    /*Handles API json and What to do with it */
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status == "200") { // if response from server is good
                APIData = JSON.parse(this.responseText);
                
                console.dir("this is recevied data below");
                console.dir(APIData);

                pageParse(APIData)
            } else {
                error = this.statusText;
                console.dir(error)
            }
        }
    }


}); // DOM Content