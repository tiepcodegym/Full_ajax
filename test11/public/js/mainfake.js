$(document).ready(function () {
    $(".modal-update").hide();
    let baseUrl = origin;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: baseUrl + "/api/books",
        type: "GET",
        dataType: "json",
        success: function (res) {
            displayAllBook(res)
        }
    })

    function displayAllBook(books) {
        let str = "";
        for (let i = 0; i < books.length; i++) {
            str += `<tr id="book-${books[i].id}">
               <td>${books[i].id}</td>
               <td>${books[i].title}</td>
               <td>${books[i].code}</td>
               <td>${books[i].author}</td>
                <td><button data-id="${books[i].id}" class="btn btn-warning edit-book">Update</button></td>
               <td><button data-id="${books[i].id}" class="btn btn-danger book-delete">Delete</button></td>
               </tr>`;
        }
        $("tbody").html(str);
    }



    $("body").on("click", ".book-delete", function () {
        let id = $(this).attr("data-id");
        if (confirm("Ban co muon xoa khong ?")) {
            $.ajax({
                url: baseUrl + "/api/books/delete/" + id,
                type: "GET",
                success: function (res) {
                    $(`#book-${id}`).remove();
                }
            })
        }

    })

    $("body").on("click", "#add-book", function () {
        $(".modal").show();
        $(".form-add").trigger("reset");
    })

    $("body").on("click", ".btn-close-modal", function () {
        $(".modal").hide();
    })



    $("body").on("click", ".add-book", function () {
        let title = $("#book-title").val();
        let code = $("#book-code").val();
        let author = $("#book-author").val();
        $(".add-book").attr("disabled", true);

        $.ajax({
            url: baseUrl + "/api/books",
            type: "POST",
            dataType: "json",
            data: {
                title: title,
                code: code,
                author: author,
            },
            success: function (res) {
                $(".add-book").attr("disabled", false);
                $(".modal").hide();
                addBook(res.data);

            }

        })
    })

    function addBook(books) {
        let str = `<tr id="book-${books.id}">
               <td>${books.id}</td>
               <td>${books.title}</td>
               <td>${books.code}</td>
               <td>${books.author}</td>
                <td><button data-id="${books.id}" class="btn btn-warning edit-book">Update</button></td>
               <td><button data-id="${books.id}" class="btn btn-danger book-delete">Delete</button></td>
              </tr>`;
        $(".book-list").prepend(str);
    }

    $("body").on("click", ".edit-book", function () {
        $(".modal-update").show();
        let id = $(this).attr("data-id");
        $.ajax({
            url: baseUrl + "/api/books/"+id,
            type: "GET",
            dataType: "json",

            success: function (res) {
                $(".book-id").val(res.data.id);
                $(".book-title").val(res.data.title);
                $(".book-code").val(res.data.code);
                $(".book-author").val(res.data.author);

            }

        })
    })

    $("body").on("click", ".update-book", function () {
        let id = $(".book-id").val();
        $.ajax({
            url: baseUrl + "/api/books/"+id,
            type: "POST",
            dataType: "json",
            data: {
                title:  $(".book-title").val(),
                code:  $(".book-code").val(),
                author:  $(".book-author").val()
            },

            success: function (res) {
                $(".modal").hide();
                $(`#book-${id} td:nth-child(1)`).html(res.data.id);
                $(`#book-${id} td:nth-child(2)`).html(res.data.title);
                $(`#book-${id} td:nth-child(3)`).html(res.data.code);
                $(`#book-${id} td:nth-child(4)`).html(res.data.author);

            }

        })
    })


})
