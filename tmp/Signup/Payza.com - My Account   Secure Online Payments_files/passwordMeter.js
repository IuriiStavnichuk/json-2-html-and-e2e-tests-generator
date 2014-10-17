(function ($) {
    $.fn.passwordMeter = function (options) {
        /// <summary>
        ///     Displays a password strength meter.
        /// </summary>
        /// <param name="options" type="Object" optional="false">
        ///     <para>monitor: '[selector]'</para>
        /// </param>

        var settings = {};

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        // make sure "monitor" was passed in as an option
        if (!settings.monitor) {
            throw new Error('passwordMeter plugin: "monitor" parameter is mandatory');
        }

        return this.each(function () {
            var $self = $(this);

            $(settings.monitor).on('keyup.passwordMeter', function () {
                var password = $(this).val(),
                    strength,
                    color;

                if (password.length > 0) {
                    strength = _passwordStrength(password);
                    switch (strength) {
                        case 1:
                            $self.find('.strength')
                                .filter('.good,.strong').hide()
                                .end()
                                .filter('.weak').show();
                            color = 'red';
                            break;
                        case 2:
                            $self.find('.strength')
                                .filter('.weak,.strong').hide()
                                .end()
                                .filter('.good').show();
                            color = 'orange';
                            break;
                        case 3:
                            $self.find('.strength')
                                .filter('.weak,.good').hide()
                                .end()
                                .filter('.strong').show();
                            color = 'green';
                            break;
                    }

                    // adjust the meter's width and color
                    $self.find('.meter').css({
                        width: Math.round($self.innerWidth() / 3) * strength,
                        backgroundColor: color
                    });

                    // show the password meter
                    $self.filter(':hidden').show();
                } else {
                    // hide the password meter if the password field is emtpy
                    $self.hide();
                }
            });
        });

        // helper function, returns the password's strength
        function _passwordStrength(password) {
            var strength = 0,
                score = 0,
                shortPassLength = 7,
                base = {
                    Excess: 0,
                    Upper: 0,
                    Numbers: 0,
                    Symbols: 0
                },
                bonus = {
                    Excess: 3,
                    Upper: 4,
                    Numbers: 5,
                    Symbols: 5,
                    Combo: 0
                },
                penalty = {
                    FlatLower: 0,
                    FlatNumber: 0
                },
                i;

            // analyze the password, count uppercase letters, numbers and symbols
            for (i = 0; i < password.length; i = i + 1) {
                if (password[i].match(/[A-Z]/)) { base.Upper = base.Upper + 1; }
                if (password[i].match(/[0-9]/)) { base.Numbers = base.Numbers + 1; }
                if (password[i].match(/([!,@,#,$,%,\^,&,*,?,_,~])/)) { base.Symbols = base.Symbols + 1; }
            }

            // give some points for long passwords
            base.Excess = password.length - shortPassLength;

            if (base.Upper && base.Numbers && base.Symbols) {
                // give a bonus for passwords that contain uppercase letters and numbers and symbols
                bonus.Combo = 25;
            } else if ((base.Upper && base.Numbers) ||
                       (base.Upper && base.Symbols) ||
                       (base.Numbers && base.Symbols)) {
                // give a smaller bonus for passwords that contain any pair
                // of uppercase letters, numbers and symbols
                bonus.Combo = 15;
            }

            // penalize passwords that only contain lowercase letters
            if (password.match(/^[\sa-z]+$/g)) {
                penalty.FlatLower = 15;
            }

            // penalize passwords that only contain numbers
            if (password.match(/^[\s0-9]+$/g)) {
                penalty.FlatNumber = 35;
            }

            score = base.Excess * bonus.Excess +
                    base.Upper * bonus.Upper +
                    base.Numbers * bonus.Numbers +
                    base.Symbols * bonus.Symbols +
                    bonus.Combo - penalty.FlatLower - penalty.FlatNumber;

            if (score <= 30) {
                strength = 1;
            } else if (score > 30 && score <= 70) {
                strength = 2;
            } else {
                strength = 3;
            }

            return strength;
        }
    };
}(jQuery));