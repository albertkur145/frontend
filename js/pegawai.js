
// variable global
let num;

function enter() {
    if (event.keyCode === 13) {
        getDataByName($('#keyword').val());
    }
}

function activeTab() {
    $('#app .left .pegawai-tab').addClass('active-tab');
}

function logout() {
    localStorage.removeItem('pegawai');
    window.location.href = `${BASE_URL}cpanel.html`;
}

function hidePopup() {
    $('.popup-message').css('display', 'none');
    window.location.href = `${BASE_URL}pegawai.html`;
}

function generateDate(date) {
    let arr = date.split('-');
    let result = '';
    
    for(let i = arr.length-1; i >= 0; i--) {
        if (i != 0) 
            result += `${arr[i]} - `;
        else
            result += `${arr[i]}`;
    }

    return result;
}

function setTable(data) {
    let table = $('#app .right .content .data .table tbody');
    table.html('');

    data.forEach((value, i) => {
        value.updated_at === null ? value.updated_at = '-' : value.updated_at;

        table.append(`
            <tr>
                <th>${num}</th>
                <td>${value.nama}</td>
                <td>${value.alamat}</td>
                <td>${generateDate(value.tanggal_lahir.toString())}</td>
                <td>${value.no_hp}</td>
                <td>${value.username}</td>
                <td>${value.role_name}</td>
                <td>${value.created_at}</td>
                <td>${value.updated_at}</td>
                <td><a href="${BASE_URL}pegawai-form.html?${value.id}"><i class="fas fa-pen edit"></i></a> <i class="fas fa-times delete ml-1" style="font-size: 1.1875rem; cursor: pointer;" onclick="showMessageConfirm(${value.id})"></i></td>
            </tr>
        `);
        num += 1;
    });
}

function showMessageConfirm(id) {
    $('.confirm-message').css('display', 'flex');
    $('.confirm-message .message .confirm').attr('onclick', `deleteData(${id})`);
}

function hideConfirmMessage() {
    $('.confirm-message').css('display', 'none');
}

function deleteData(id) {
    $('.loading').css('display', 'flex');

    $.ajax({
        url: `${API}Pegawai/delete`,
        type: 'post',
        dataType: 'json',
        data: {
            id: id
        },

        success: function (response) {
            $('.loading').css('display', 'none');
            if (response.code === 200) {
                hideConfirmMessage();
                $('.popup-message .message p').text('Data berhasil dihapus dari sistem');
                $('.popup-message').css('display', 'flex');
            }
        },

        error: function () {
            $('.loading').css('display', 'none');
            $('.popup-message .message p').text('Koneksi terputus! Silahkan coba lagi');
            $('.popup-message').css('display', 'flex');
        }
    });
}

// function getAllData() {
//     $('.loading').css('display', 'flex');

//     $.ajax({
//         url: `${API}Pegawai`,
//         type: 'get',
//         dataType: 'json',

//         success: function (response) {
//             $('.loading').css('display', 'none');
//             if (response.code === 200) {
//                 setTable(response.data);
//             }
//         },

//         error: function (response) {
//             $('.loading').css('display', 'none');
//             if (response.responseJSON.code === 404) {
//                 $('#app .right .content .data .table tbody').html('');
//                 $('#app .right .content .emptyTable').css('display', 'block');
//             }
//         }
//     });
// }

function getAllData(page = 1) {
    $('.loading').css('display', 'flex');
    num = (page * 10) - 9;

    $.ajax({
        url: `${API}Pegawai/paging`,
        type: 'get',
        dataType: 'json',

        data: {
            page: page
        },

        success: function (response) {
            $('.loading').css('display', 'none');
            if (response.code === 200) {
                addPaging(response.amount, page);
                setTable(response.data);
            }
        },

        error: function (response) {
            $('.loading').css('display', 'none');
            if (response.responseJSON.code === 404) {
                $('#app .right .content .data .table tbody').html('');
                $('#app .right .content .emptyTable').css('display', 'block');
            }
        }
    });
}

function addPaging(amount, page) {
    let paging = $('#app .right .content .data .paging');
    paging.html('');

    for (let i = 1; i <= Math.ceil(amount / 10); i++) {
        paging.append(`
            <span class="page paging-${i}" onclick="getAllData(${i})">${i}</span>
        `);
    }

    $(`#app .right .content .data .paging-${page}`).addClass('paging-active');
}

function getDataByName(name) {
    $('.loading').css('display', 'flex');

    let paging = $('#app .right .content .data .paging');
    paging.html('');
    num = 1;

    $.ajax({
        url: `${API}Pegawai`,
        type: 'get',
        dataType: 'json',
        data: {
            nama: name
        },

        success: function (response) {
            $('.loading').css('display', 'none');
            if (response.code === 200) {
                $('#app .right .content .emptyTable').css('display', 'none');
                setTable(response.data);
            }
        },

        error: function (response) {
            $('.loading').css('display', 'none');
            if (response.responseJSON.code === 404) {
                $('#app .right .content .data .table tbody').html('');
                $('#app .right .content .emptyTable').css('display', 'block');
            }
        }
    });
}

$(document).ready(() => {

    let pegawai = JSON.parse(localStorage.getItem('pegawai'));

    if (pegawai) {
        if (pegawai.role_name !== 'Admin')
            window.history.back();
    } else {
        window.location.href = `${BASE_URL}cpanel.html`;
    }

    getAllData();
    activeTab();
});
