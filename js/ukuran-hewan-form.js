// variable global
let id = null;


function activeTab() {
    $('#app .left .ukuran-hewan-tab').addClass('active-tab');
}

function logout() {
    localStorage.removeItem('pegawai');
    window.location.href = `${BASE_URL}cpanel.html`;
}

function hidePopup() {
    $('.popup-message').css('display', 'none');
    window.location.href = `${BASE_URL}ukuran-hewan.html`;
}


// form
const form = $('#app .right .content form');
const ukuranHewan = $('#ukuran', form);

function validateUkuran() {
    if (ukuranHewan.val().length === 0)
        $('.ukuran-error', form).css('display', 'block');
    else
        $('.ukuran-error', form).css('display', 'none');
}

function validateForm() {
    if (ukuranHewan.val().length !== 0) {
        const params = {
            "nama": ukuranHewan.val()
        }
        if (!id)
            reqAPI('create', params);
        else {
            params.id = id;
            reqAPI('update', params);
        }
    }

    if (ukuranHewan.val().length === 0)
        $('.ukuran-error', form).css('display', 'block');

    return false;
}

function reqAPI(type, params) {
    $('.loading').css('display', 'flex');

    $.ajax({
        url: `${API}UkuranHewan/${type}`,
        type: 'post',
        dataType: 'json',
        data: params,

        success: function (response) {
            $('.loading').css('display', 'none');
            if (response.code === 200) {
                $('.popup-message .message p').text('Berhasil menyimpan ukuran hewan');
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

function getData(id) {
    $('#app .right .title').html(`<a href="ukuran-hewan.html">Ukuran Hewan</a> <span>></span> Ubah`);
    $('.loading').css('display', 'flex');

    $.ajax({
        url: `${API}UkuranHewan`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },

        success: function (response) {
            $('.loading').css('display', 'none');
            if (response.code === 200)
                setForm(response.data[0]);
        },

        error: function () {
            $('.loading').css('display', 'none');
            $('.popup-message .message p').text('Koneksi terputus! Silahkan coba lagi');
            $('.popup-message').css('display', 'flex');
        }
    })
}

function setForm(data) {
    ukuranHewan.val(data.nama);
}


$(document).ready(() => {

    let pegawai = JSON.parse(localStorage.getItem('pegawai'));

    if (pegawai) {
        if (pegawai.role_name !== 'Admin')
            window.history.back();
    } else {
        window.location.href = `${BASE_URL}cpanel.html`;
    }

    id = window.location.search.substring(1);
    if (id)
        getData(id);

    activeTab();
});