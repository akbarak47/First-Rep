let allBlogs = [];
 let loremIpsum =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor turpis at dui mollis mattis. Donec ante elit, pulvinar vitae auctor et, mollis vitae odio. Fusce ac quam arcu. Vivamus cursus non nulla id semper. Etiam egestas sem eget dolor ultricies iaculis. Nunc risus nisi, vestibulum nec augue sit amet, scelerisque ultrices ante. Suspendisse vestibulum, odio ac malesuada dictum, est enim consequat mi, placerat lacinia nibh quam non nisl. Sed rhoncus mattis risus, vel aliquet arcu semper sit amet.\n' +
    '\n' +
    'Curabitur aliquet sollicitudin iaculis. Nullam arcu leo, tempor nec felis ac, aliquet rutrum massa. Fusce pulvinar quam lacus, ac porttitor eros convallis at. Nulla luctus fermentum leo mattis volutpat. Praesent elementum consectetur enim id mollis. Praesent eu tincidunt tortor. Fusce eleifend, arcu sit amet tempus laoreet, nibh lacus vehicula ante, vitae posuere augue sem ac dui. Nam consectetur ipsum sem, eu tempor quam viverra sed. Praesent condimentum rhoncus nulla sit amet euismod.\n' +
    '\n' +
    'Pellentesque tristique elit consequat, feugiat diam nec, porttitor sem. Ut semper placerat nisi id faucibus. Morbi id enim vitae urna porttitor egestas. Phasellus ullamcorper ligula gravida, auctor eros eu, egestas erat. Maecenas accumsan quis leo et consequat. Pellentesque pharetra quam augue, id consectetur urna semper a. Maecenas in bibendum lacus. Nam sit amet ullamcorper sem. Phasellus vulputate venenatis tincidunt. Duis ut lorem bibendum, venenatis urna sit amet, rhoncus lorem. Quisque sit amet varius velit. Sed feugiat risus feugiat ligula varius, non facilisis purus sagittis. Integer velit turpis, tincidunt et arcu varius, finibus malesuada orci. Nam at odio velit. Nunc efficitur tortor a sodales eleifend.\n' +
    '\n' +
    'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc viverra magna malesuada ligula aliquet gravida. Mauris maximus, lectus eu euismod pulvinar, nisi turpis aliquet mi, sit amet porta odio tellus et nisl. Vestibulum vitae tincidunt quam. Proin commodo nisl vitae sagittis rhoncus. Proin in porta elit. Nulla convallis tellus leo, ut molestie quam venenatis eu. Integer blandit auctor aliquet. Vestibulum non diam id arcu euismod pharetra. Nunc nec nisi magna. In tempus cursus sagittis. Nulla facilisi. Nulla facilisi.\n' +
    '\n' +
    'Sed eget dolor dapibus, feugiat erat non, pulvinar erat. Nunc ornare enim in cursus iaculis. Mauris viverra sodales ipsum ac viverra. Duis vel accumsan metus. Sed eu imperdiet magna. Integer metus dolor, luctus vel finibus a, vestibulum ut velit. Curabitur tristique dui neque, in tempus ligula eleifend et. Nullam et nunc finibus, tempus neque quis, tincidunt lorem. Duis a purus sollicitudin, porttitor ipsum id, volutpat nunc. Sed ut commodo lorem. Nulla facilisi.\n' +
    '\n' +
    'Vestibulum finibus ultrices ipsum, non bibendum dolor vehicula tempor. Fusce in consequat massa. Fusce faucibus orci sit amet nunc consectetur scelerisque et at massa. Nullam luctus elementum nisi. Nulla hendrerit nisi vel eros ultricies finibus. Fusce pharetra egestas augue vel viverra. Maecenas vestibulum mauris eget ligula ultrices viverra. Proin accumsan lacinia scelerisque. Donec tristique diam nibh, non vehicula massa faucibus non. Pellentesque non leo ullamcorper, mollis nibh quis, sodales urna. Donec vitae pretium turpis, pretium ultricies nisi. Maecenas egestas felis arcu, et porta nisi porttitor vitae. Donec lacinia magna id ante placerat, et tincidunt orci facilisis.' 

injectInitialBlogs();

let form = document.getElementById('submitBlog')
let loremIpsumBtn = document.getElementById('auto-fill')

form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        submitFormData();
    }
    form.classList.add('was-validated')
}, false)

loremIpsumBtn.addEventListener('click', function(){
    document.getElementById("blogContent").value = loremIpsum
})

function submitFormData() {
    let title = document.getElementById("titleInput").value
    let blogContent = document.getElementById("blogContent").value
    let fullNameInput = document.getElementById("fullNameInput").value
    let blogBannerInput = document.getElementById("blogBannerInput").value
    let formData = {
        'title': title,
        'blogContent': blogContent,
        'fullName': fullNameInput,
        'blogBanner': blogBannerInput ? blogBannerInput : `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/450`
    }
    allBlogs.push(formData)
    setAllBlogsInLocalStorage();
    addBlogCard(formData, allBlogs.length - 1)
    clearForm()
    alert("Your blog was published successfully!")
}

function addBlogCard(blogData, index) {
    let cardElement = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                    <img src="${blogData.blogBanner}" class="card-img-top" alt="blog banner image">
                    <div class="card-body">
                        <h5 class="card-title">${blogData.title.slice(0, 60)}</h5>
                        <p class="card-text">${blogData.blogContent.slice(0, 150)}</p>
                        <a href='articleDetail.html?id=${index}' class="btn btn-light" id='blog-${index}'>Read full article</a>
                    </div>
                </div>
            </div>`
    document.getElementById('article-cards').insertAdjacentHTML("afterbegin", cardElement)
}

function clearForm() {
    document.getElementById("titleInput").value = ""
    document.getElementById("blogContent").value = ""
    document.getElementById("fullNameInput").value = ""
    document.getElementById("blogBannerInput").value = ""
}

function setAllBlogsInLocalStorage() {
    localStorage.setItem('allBlogs', JSON.stringify(allBlogs))
}

function renderBlogCards() {
    allBlogs.forEach((blog, index) => {
        addBlogCard(blog, index)
    })
}

function injectInitialBlogs() {
    allBlogs.push({
        title: `Top 10 beautiful places to travel`,
        blogContent: loremIpsum,
        fullName: 'Akbar',
        blogBanner:'https://w0.peakpx.com/wallpaper/265/481/HD-wallpaper-nature.jpg' ,
    })

    allBlogs.push({
        title: `Childrens safety`,
        blogContent: loremIpsum,
        fullName: 'Rehana banu',
        blogBanner: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' ,
    })

   
    if (localStorage.getItem('allBlogs')) {
        allBlogs = JSON.parse(localStorage.getItem('allBlogs'))
    } else {
        setAllBlogsInLocalStorage()
    }
    renderBlogCards();
}
