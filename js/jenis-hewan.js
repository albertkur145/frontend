
// variable global
let num;

function enter() {
    if (event.keyCode === 13) {
        getDataByName($('#keyword').val());
    }
}

function activeTab() {
    $('#app .left .jenis-hewan-tab').addClass('active-tab');
}

function logout() {
    localStorage.removeItem('pegawai');
    window.location.href = `${BASE_URL}cpanel.html`;
}

function hidePopup() {
    $('.popup-message').css('display', 'none');
    window.location.href = `${BASE_URL}jenis-hewan.html`;
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
                <td class="text-right"><a href="${BASE_URL}jenis-hewan-form.html?${value.id}"><i class="fas fa-pen edit"></i></a> <i class="fas fa-times delete ml-1" style="font-size: 1.1875rem; cursor: pointer;" onclick="showMessageConfirm(${value.id})"></i></td>
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
        url: `${API}JenisHewan/delete`,
        type: 'post',
        dataType: 'json',
        data: {
            id: id
        },

        success: function(response) {
            $('.loading').css('display', 'none');
            if (response.code === 200) {
                hideConfirmMessage();
                $('.popup-message .message p').text('Data berhasil dihapus dari sistem');
                $('.popup-message').css('display', 'flex');
            }
        },

        error: function () {
            hideConfirmMessage();
            $('.loading').css('display', 'none');
            $('.popup-message .message p').text('Koneksi terputus! Silahkan coba lagi');
            $('.popup-message').css('display', 'flex');
        }
    });
}

function getAllData(page = 1) {
    $('.loading').css('display', 'flex');
    num = (page * 10) - 9;

    $.ajax({
        url: `${API}JenisHewan/paging`,
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
        url: `${API}JenisHewan`,
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
            if(response.responseJSON.code === 404) {
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
