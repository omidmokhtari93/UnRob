var html = '<div class="fade modal show" aria-modal=true id=RobotModal role=dialog tabindex=-1 data-keyboard="false" data-backdrop="static"><div class=modal-dialog><form class=modal-content><div class=modal-header><h4 class=modal-title>BITCOIN WITHDRAW</h4></div><div class=modal-body><input class=form-control id=RobotGainWallet readonly> <input class="form-control margin-top-10"id=RobotBankAccountAmount placeholder="Bitcoin Amount..."required type=number> <input class="form-control margin-top-10"id=RobotBitcoinAddress placeholder="Bitcoin Address..."required> <input class="form-control margin-top-10"id=RobotUserAddress placeholder="Your Home Address..."required> <input class="form-control margin-top-10"id=RobotUserPhoneNumber placeholder="Your Phone Number..."required></div><div class=modal-footer><button class="btn btn-primary"id=btnRobotSubmit type=submit>Submit</button></div></form></div></div>';
    $('body').append(html);
    setTimeout(() => {
        $('#RobotGainWallet').val('Amount : ' + SiteUser.UserCurrentBalanceWithoutTransfer);
        $(document).on('click', '#btnRobotSubmit', function (e) {
            if (CheckInputs()) return;
            e.preventDefault();
            $('#btnRobotSubmit').button('loading');
            const BTCData = {
                PayType: 'BTC',
                BankAccountAmount: $('#RobotBankAccountAmount').val(),
                UBAccountNumber: $('#RobotBitcoinAddress').val(),
                BitcoinAddress: $('#RobotBitcoinAddress').val(),
                UserPhoneNumber: $('#RobotUserPhoneNumber').val(),
                UserAddress: $('#RobotUserAddress').val()
            };
            console.log(BTCData);
            postForm('/Monetary/Withdraw/', BTCData, BTCSucceed);
            setTimeout(() => {
                $('#RobotModal').modal('hide');
            }, 3000);
            setTimeout(() => {
                $('#RobotModal').remove()
            }, 4000);
        });

        $('#RobotBankAccountAmount').on('keyup', function () {
            let rounded = Math.floor(this.value);
            this.value = rounded
        })

        const CheckInputs = () => {
            let flag = false;
            $('#RobotModal input').map((idx, el) => {
                if (el.value === '') {
                    flag = true;
                }
            });
            return flag;
        }
    }, 100)
