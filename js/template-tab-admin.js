const tabLeft = `
    <!-- header -->
    <div class="header">
        <p>Kouvee <i class="fas fa-paw"></i></p>
    </div>
    <!-- akhir header -->

    <!-- content tab -->
    <div class="content">
        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab jenis-hewan-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-dog"></i></div>
                        <div class="col-10 txt">Jenis hewan</div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab ukuran-hewan-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-hourglass-half"></i></div>
                        <div class="col-10">Ukuran hewan</div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab produk-tab">
                    <div class="row">
                        <div class="col-1"><i class="fab fa-product-hunt"></i></div>
                        <div class="col-10">Produk</div>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab layanan-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-broom"></i></div>
                        <div class="col-10">Layanan</div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab pegawai-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-user-cog"></i></div>
                        <div class="col-10">Pegawai</div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab supplier-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-people-carry"></i></div>
                        <div class="col-10">Supplier</div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="padding: 0;">
                <a href="javascript:void(0)" class="tab pemesanan-tab">
                    <div class="row">
                        <div class="col-1"><i class="fas fa-truck-loading"></i></div>
                        <div class="col-10">Pemesanan</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <!-- akhir content tab -->
`;


$('#app .left').html(tabLeft);