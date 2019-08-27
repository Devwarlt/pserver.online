function renderDeadCharacterPopover(t, e) {
    $("#" + t + " .character").each(function () {
        function t(t) {
            var e = ['<table class="character-dyes">'];
            return $.each(t, function (t, a) {
                "0" != a && items[a] && (e.push('<tr><td><span class="item" data-item="'), e.push(a), e.push('"></span></td><td>'), e.push(items[a][0]), e.push("</td></tr>"))
            }), e.push("</table>"), e = $(e.join("")), makeItemsIn(e), e
        }

        var e = $(this), a = classInfoById[parseInt(e.data("class"))], s = parseInt(e.data("skin")),
            r = _.detect(a[6], function (t) {
                return t[0] == s
            });
        e.popover({
            html: !0,
            content: t([e.data("accessory-dye-id"), e.data("clothing-dye-id")]),
            placement: "top",
            trigger: "manual",
            title: a[1] + " - " + r[1]
        }), e.hover(function () {
            e.popover("show")
        }, function () {
            e.popover("hide")
        })
    })
}

function renderDeadCharacterStats(t, e) {
    function a(t, e) {
        var a = [0, 1, 2, 3, 4, 6, 7, 5], s = classInfoById[t][5], r = $.map(a, function (t) {
            return s[t]
        });
        if (e > 1497966263) return r;
        if (805 === t && (r[2] = 60), e > 1481905199) return r;
        if (801 === t && (r[2] = 60), e > 1413512071) return r;
        switch (t) {
            case 784:
                r[4] = 50, r[7] = 50;
                break;
            case 799:
                r[3] = 25, r[4] = 50, r[7] = 50;
                break;
            case 803:
                r[7] = 50
        }
        if (e > 1339533420) return r;
        switch (t) {
            case 768:
                r[5] = 75;
                break;
            case 775:
                r[5] = 75;
                break;
            case 782:
                r[5] = 75, r[6] = 75;
                break;
            case 784:
                r[5] = 75;
                break;
            case 799:
                r[5] = 75, r[6] = 50;
                break;
            case 800:
                r[5] = 75, r[4] = 50;
                break;
            case 802:
                r[5] = 75;
                break;
            case 803:
                r[5] = 75;
                break;
            case 801:
                r[5] = 50;
                break;
            case 804:
                r[5] = 75, r[2] = 65, r[4] = 70, r[7] = 70
        }
        if (e > 1301377140) return r;
        switch (t) {
            case 798:
                r[3] = 50;
                break;
            case 800:
                r[2] = 50, r[7] = 50;
                break;
            case 801:
                r[2] = 75, r[7] = 75
        }
        return r
    }

    function s(t) {
        return 1322439660 > t ? 6 : 1329172860 > t ? 7 : 8
    }

    function r(t, e, a, s) {
        function r(a, s) {
            var r = !0;
            d.push("<tr>");
            for (var c = a; s >= c; ++c) o(h[c], e[c], t[c]), r &= !u(h[c]) || e[c];
            p(a, s), d.push("</tr>"), r || n(a, s)
        }

        function n(s, r) {
            d.push("<tr>");
            for (var n = s; r >= n; ++n) c(h[n], e[n], t[n], a[n]);
            p(s, r), d.push("</tr>")
        }

        function o(t, e, a) {
            d.push("<td"), e && u(t) && d.push(' class="maxed"'), d.push(">"), d.push(t), d.push(": "), d.push(a), d.push("</td>")
        }

        function c(t, e, a, s) {
            d.push('<td class="to-max">'), !e && u(t) && (d.push(s - a), ("HP" == t || "MP" == t) && (d.push(" ("), d.push(Math.ceil((s - a) / 5)), d.push(")")), d.push(" to max")), d.push("</td>")
        }

        function p(t, e) {
            for (i = 0; i < 3 - (e - t + 1); ++i) d.push("<td></td>")
        }

        function u(t) {
            switch (s) {
                case 8:
                    return !0;
                case 7:
                    return "MP" != t;
                case 6:
                    return "MP" != t && "HP" != t
            }
        }

        var h = ["HP", "MP", "ATT", "DEF", "SPD", "VIT", "WIS", "DEX"], d = ['<table class="stats-table">'];
        return r(0, 1), r(2, 4), r(5, 7), d.push("</table>"), d.join("")
    }

    $("#" + t + " td:nth-child(" + e + ") span").each(function () {
        var t = $(this), e = t.data("stats"), n = new Date(t.data("died-on")).getTime() / 1e3,
            o = a(t.data("class"), n), c = [!1, !1, !1, !1, !1, !1, !1], i = 0, p = s(n);
        $.each(o, function (t, a) {
            i += (c[t] = a == e[t]) ? 1 : 0
        }), t.html(i + "/" + p + '<i class="glyphicon glyphicon-info-sign"></i>'), t.popover({
            html: !0,
            content: r(e, c, o, p),
            title: "Base stats",
            trigger: "manual",
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        }), t.parent().hover(function () {
            t.popover("show")
        }, function () {
            t.popover("hide")
        })
    })
}

function renderFameBonusesPopover(t, e) {
    function a(t) {
        var e = ['<table class="stats-table bonus-table"><thead><tr><th>Bonus</th><th>Fame</th></tr></thead><tbody>'],
            a = 0, r = 0;
        return $.each(s, function (s, n) {
            t[s] && (a++, r += t[s], e.push("<tr><td>"), e.push(n), e.push("</td><td>"), e.push(t[s]), e.push("</td></tr>"))
        }), 0 == a ? "No bonuses" : (a > 1 && (e.push('<tr class="total"><td>Sum</td><td>'), e.push(r), e.push("</td>")), e.push("</tbody></table>"), e.join(""))
    }

    var s = ["Accurate", "Ancestor", "Boots on the Ground", "Cartographer", "Friend of the Cubes", "Doer of Deeds", "Explorer", "First Born", "Enemy of the Gods", "Slayer of the Gods", "Leader of Men", "Legacy Builder", "Mundane", "Oryx Slayer", "Pacifist", "Sharpshooter", "Sniper", "Team Player", "Thirsty", "Tunnel Rat", "Well Equipped"];
    $("#" + t + " td:nth-child(" + e + ") span").each(function () {
        var t = $(this);
        t.append('<i class="glyphicon glyphicon-info-sign"></i>'), t.popover({
            html: !0,
            content: a(t.data("bonuses")),
            title: "Bonuses",
            trigger: "manual",
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        }), t.parent().hover(function () {
            t.popover("show")
        }, function () {
            t.popover("hide")
        })
    })
}