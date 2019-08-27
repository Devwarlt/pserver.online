function statsTable(e, r, t, i, a) {
    function n(i, a) {
        var n = !0;
        h.push("<tr>");
        for (var u = i; a >= u; ++u) c(m[u], t[u], e[u], r[u]), n &= t[u];
        d(i, a), h.push("</tr>"), n || (o(i, a), s(i, a))
    }

    function o(i, n) {
        h.push("<tr>");
        for (var o = i; n >= o; ++o) u(t[o], e[o], r[o], a[o]);
        d(i, n), h.push("</tr>")
    }

    function s(a, n) {
        h.push("<tr>");
        for (var o = a; n >= o; ++o) l(m[o], t[o], e[o], r[o], i[o]);
        d(a, n), h.push("</tr>")
    }

    function c(e, r, t, i) {
        h.push("<td"), r && h.push(' class="maxed"'), h.push(">"), h.push(e), h.push(": "), h.push(t), 0 !== i && (h.push("("), i > 0 && h.push("+"), h.push(i), h.push(")")), h.push("</td>")
    }

    function u(e, r, t, i) {
        var a = r - t - i;
        h.push('<td class="from-avg' + (0 > a ? " below-avg" : " above-avg") + '">'), e || (0 == a ? h.push("average") : (a > 0 && h.push("+"), h.push(a), h.push(" from avg"))), h.push("</td>")
    }

    function l(e, r, t, i, a) {
        h.push('<td class="to-max">'), r || (h.push(a - t + i), ("HP" == e || "MP" == e) && (h.push(" ("), h.push(Math.ceil((a - t + i) / 5)), h.push(")")), h.push(" to max")), h.push("</td>")
    }

    function d(e, r) {
        for (var t = 0; 3 - (r - e + 1) > t; ++t) h.push("<td></td>")
    }

    var h = ['<table class="stats-table">'], m = ["HP", "MP", "ATT", "DEF", "SPD", "VIT", "WIS", "DEX"];
    return n(0, 1), n(2, 4), n(5, 7), h.push("</table>"), h.join("")
}

function renderStats(e) {
    $("#" + e + " .player-stats").each(function () {
        var e = $(this), r = [0, 1, 2, 3, 4, 6, 7, 5], t = JSON.parse(e.attr("data-stats")),
            i = JSON.parse(e.attr("data-bonuses")), a = JSON.parse(e.attr("data-class")),
            n = JSON.parse(e.attr("data-level")), o = classInfoById[a], s = o[5], c = $.map(r, function (e) {
                return s[e]
            }), u = [!1, !1, !1, !1, !1, !1, !1, !1], l = 0, d = o[4], h = o[3], m = $.map(d, function (e, r) {
                return h[r] + e * (n - 1)
            }), m = $.map(r, function (e) {
                return m[e]
            });
        $.each(c, function (e, r) {
            var a = t[e] - i[e];
            a >= r && (t[e] = r + i[e], u[e] = !0, l += 1)
        }), e.html(l + '/8 <i class="glyphicon glyphicon-info-sign"></i>'), e.popover({
            html: !0,
            content: statsTable(t, i, u, c, m),
            trigger: "manual",
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
        }), e.parent().hover(function () {
            e.popover("show")
        }, function () {
            e.popover("hide")
        })
    })
}

function alternativesTable(e) {
    var r = '<table class="alternatives-table"><thead><tr><th>Server</th><th>Price</th><th>Quantity</th><th>Time Left</th></tr></thead><tbody>';
    return $.each(e, function (e, t) {
        r += "<tr>", $.each(t, function (e, t) {
            r += "<td>", 3 == e ? 2147483647 != t ? (r += "<", r += t + 1, r += " min") : r += "new" : r += t, r += "</td>"
        }), r += "</tr>"
    }), r += "</tbody></table>"
}

function renderAlternatives(e, r) {
    $("#" + e + " .cheapest-server").each(function () {
        var e = $(this), r = JSON.parse(e.attr("data-alternatives"));
        r.length > 0 && (e.append(' <i class="glyphicon glyphicon-info-sign"></i>'), e.popover({
            html: !0,
            content: alternativesTable(r),
            trigger: "manual",
            title: "Other servers",
            placement: "left"
        }), e.parent().hover(function () {
            e.popover("show")
        }, function () {
            e.popover("hide")
        }))
    })
}

function linkForItem(e) {
    var r = items[e] || items[-1];
    return 0 != r[1] && 10 != r[1] && 26 != r[1] || 3180 == e ? "/wiki/" + r[0].toLowerCase().replace(/[\'\ ]/g, "-").replace(/[^a-z0-9-]/g, "") : null
}

function renderItems(e) {
    makeItemsIn($("#" + e)).each(function () {
        $(this).wrap(function () {
            var e = linkForItem($(this).attr("data-item"));
            return null == e ? !1 : '<a href="' + e + '" target="_blank"/>'
        })
    })
}

function makeItemsIn(e) {
    return $(".item", e).each(function () {
        makeItem($(this))
    })
}

function renderItemTable(e) {
    return ['<table class="stats-table"><tbody><tr><td>Fame Bonus:</td><td>', e[5], "%</td></tr><tr><td>Feed Power:</td><td>", e[6], "</td></tr></tbody></table>"].join("")
}

function makeItem(e) {
    var r = items[e.attr("data-item")] || items[-1],
        t = 10 == r[1] || 0 == r[1] || 26 == r[1] ? "" : -1 == r[2] ? " UT" : " T" + r[2], i = r[0].match(/ x (\d+)$/),
        a = i && i[1];
    a && e.prepend('<span class="token-amount">' + a + "</span>"), e.css("background-position", "-" + r[3] + "px -" + r[4] + "px").popover({
        title: r[0] + t,
        trigger: "hover",
        container: "body",
        placement: function (e, r) {
            var t = $(r).offset().top - $(window).scrollTop();
            return 110 > t ? "bottom" : "top"
        },
        html: !0,
        content: renderItemTable(r)
    })
}

function renderPets(e) {
    $("#" + e + " .pet").each(function () {
        var e = $(this), r = items[e.attr("data-item")];
        r && e.css("background-position", "-" + r[1] + "px -" + r[2] + "px").attr("title", r[0])
    })
}

function renderArticle(e, r) {
    renderItems(e), $("#" + e + " td:nth-child(" + r + ") .item").each(function () {
        var e = $(this), r = items[e.attr("data-item")] || items[-1], t = e.closest("td").next();
        t.text(r[0])
    })
}

function renderNumeric(e, r, t) {
    var i = $("#" + e + " td:nth-child(" + r + ")"), a = i.map(function () {
        for (var e = $(this); e.children().length;) e = $(e.children()[0]);
        return e
    });
    a.text(function (e, r) {
        return $(this).closest("td").data("value", r), formatNumber(r)
    }), t || i.hover(function () {
        showDiffs($(this))
    }, function () {
        hideDiffs($(this))
    })
}

function showDiffs(e) {
    var r = e.data("value");
    siblingsDo(e, 25, function (e, t) {
        if ("" != t) {
            var i = t - r, a = '<span class="diff"><span';
            0 > i ? a += ' class="diff-smaller">-' : i > 0 && (a += ' class="diff-bigger">+'), i % 1 != 0 && (i = i.toFixed(1)), a += formatNumber(Math.abs(i)), a += "</span>", this.append(a)
        }
    })
}

function hideDiffs(e) {
    siblingsDo(e, 25, function () {
        $(".diff", this).remove()
    })
}

function siblingsDo(e, r, t) {
    siblingsSelectedDo(e, r, function (e) {
        return e.prev()
    }, t), siblingsSelectedDo(e, r, function (e) {
        return e.next()
    }, t)
}

function siblingsSelectedDo(e, r, t, i) {
    for (var a = e.parent(), n = e.index(), o = 0; r > o && (a = t(a), a.length); ++o) {
        var s = a.find("td:nth-child(" + (n + 1) + ")"), c = s.data("value");
        i.call(s, o + 1, c)
    }
}

function formatNumber(e) {
    var r = /(\d+)(\d{3})/;
    for (e += ""; r.test(e);) e = e.replace(r, "$1 $2");
    return e
}

function formatTimeLeft(e, r) {
    $("#" + e + " td:nth-child(" + r + ")").text(function (e, r) {
        var t = parseInt(r);
        return 2147483647 == t ? "new" : 0 == t ? "<1 minute" : "<" + (t + 1) + " minutes"
    })
}

function makeSortable(e, r) {
    $("#" + e).tablesorter({headers: r})
}

function bookmarkPlayer(e) {
    bookmarkName(e, "players")
}

function bookmarkGuild(e) {
    bookmarkName(e, "guilds")
}

function bookmarkName(e, r) {
    if (storage) {
        var t = storage[r];
        t = t ? JSON.parse(t) : [];
        var i = $.inArray(e, t);
        -1 != i && t.splice(i, 1), t.unshift(e), t.splice(200, t.length - 200), storage[r] = JSON.stringify(t)
    }
}

function colorForRank(e) {
    var r;
    return $.each(window.rankBoundaries, function (t, i) {
        return i >= e ? (r = window.rankColors[t], !1) : void 0
    }), r || window.rankColors[window.rankColors.length - 1]
}

function renderDonationPopover(e, r) {
    function t(e) {
        a += '<span class="timeago" title="' + r[e] + '"></span>'
    }

    var i, a, n = $("#" + e + " img"), o = n.parent().prev().text(), s = n.attr("src"),
        c = s.slice(0, -1 * "crown-place.png".length) + "crown.png";
    if (r.length) {
        i = "Thanks " + o + "!", a = "<span>" + o + " donated ", t(0);
        for (var u = 1; u < r.length - 1; ++u) a += ", ", t(u);
        r.length > 1 && (a += " and ", t(r.length - 1)), a += "</span>", a = $(a), $(".timeago", a).timeago()
    } else i = o + " hasn't donated yet.", a = "Click on the crown to donate", n.hover(function () {
        $(this).attr("src", c)
    }, function () {
        $(this).attr("src", s)
    });
    n.popover({html: !0, title: i, content: a, trigger: "hover"})
}

function addSearch(e, r, t) {
    var i, a = $("#" + e);
    storage && (i = storage[t], i && (i = JSON.parse(storage[t]))), a.typeahead({highlight: !0}, {
        displayKey: function (e) {
            return e
        }, source: function (e, r) {
            r(typeaheadFilter(e, i))
        }
    }).on("typeahead:selected", function (e, t) {
        window.location.pathname = r + "/" + encodeURIComponent(t)
    }).keypress(function (e) {
        13 == e.which && (window.location.pathname = r + "/" + encodeURIComponent($(a).val()))
    })
}

function addPlayerSearch(e) {
    addSearch(e, "/player", "players")
}

function addGuildSearch(e) {
    addSearch(e, "/guild", "guilds")
}

function initializeSearch(e, r) {
    function t(e) {
        window.location.pathname = "/" + ("Player" == u ? "player" : "guild") + "/" + encodeURIComponent(e)
    }

    var i = $("#" + r), a = $("#" + e), n = ($(".player-guild-toggle-panel", a), $("input[type=text]", a)),
        o = $("label", a), s = ($(".btn-group", a), $(".auth-panel")), c = !0, u = "Player",
        l = {Player: [], Guild: []};
    storage && (l.Player = JSON.parse(storage.players || "[]"), l.Guild = JSON.parse(storage.guilds || "[]")), i.click(function () {
        s.animate({opacity: 0}, "fast", null, function () {
            s.hide()
        }), i.animate({opacity: 0}, "fast", null, function () {
            i.hide(), a.show(), a.animate({opacity: 1}, "fast"), n.focus()
        }), n.attr("placeholder", u + " search"), c = !0
    }), n.focus(function () {
        c = !0, n.attr("placeholder", u + " search")
    }).blur(function () {
        c && a.animate({opacity: 0}, "fast", null, function () {
            a.hide(), i.show(), i.animate({opacity: 1}, "fast"), s.show(), s.animate({opacity: 1}, "fast")
        })
    }).typeahead({highlight: !0}, {
        displayKey: function (e) {
            return e
        }, source: function (e, r) {
            r(typeaheadFilter(e, l[u]))
        }
    }).on("typeahead:selected", function (e, r) {
        return t(r), !0
    }).keypress(function (e) {
        13 == e.which && (window.location.pathname = "/" + u.toLowerCase() + "/" + encodeURIComponent(n.val()))
    }), o.mousedown(function () {
        c = !1
    }).click(function () {
        u = $(this).text(), n.trigger("focus")
    }).button()
}

function typeaheadFilter(e, r, t) {
    t = t || 9;
    var i = [], a = filterQuery(e), n = a.toLowerCase();
    r && $.each(r, function (e, r) {
        var e = r.toLowerCase().indexOf(n);
        -1 != e && (i[e] ? i[e].push(r) : i[e] = [r])
    });
    var o = [a];
    return $.each(i, function (e, r) {
        r && (o.length > t || (r.sort(), $.each(r, function (e, r) {
            o.length > t || o.push(r)
        })))
    }), o
}

function filterQuery(e) {
    return e.replace(/^\s+|\s+$/g, "").replace(/ +/g, " ")
}

function indicateSelectedItem() {
    $(window.location.hash).parent().css("border-left", "3px solid #777")
}

function makeChooserRedirector(e, r) {
    $("#" + e).change(function () {
        window.location.pathname = r + $(this).val()
    })
}

function addAnchorsInDescription(e, r) {
    var t = new RegExp("(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be|imgur\\.com|i\\.imgur\\.com|puu\\.sh|twitch\\.tv|reddit\\.com|redd\\.it|github\\.com|community\\.kabam\\.com|realmeye\\.com|bluenosersguide\\.weebly\\.com|pfiffel\\.com|kitsu\\.io)(\\/[\\w\\/\\.\\?=&;_-]+)?" + (r ? "|" + r : ""), "gi"),
        i = $("#" + e);
    $(".description-line", i).each(function () {
        $(this).html($(this).html().replace(t, function (e) {
            var r = e;
            /^https?:\/\//.test(e) || (r = "http://" + e);
            var t = /realmeye\.com/.test(e) ? ' rel="nofollow"' : ' rel="nofollow external"';
            return '<a href="' + encodeURI(r) + '"' + t + ">" + e + "</a>"
        }))
    })
}

function renderMail(e) {
    $("#" + e).attr("href", $.map([109, 97, 105, 108, 116, 111, 58, 105, 110, 102, 111, 64, 114, 101, 97, 108, 109, 101, 121, 101, 46, 99, 111, 109], function (e) {
        return String.fromCharCode(e)
    }).join(""))
}

function initializeLoginButton(e) {
    $("#" + e).click(function () {
        $(this).button("loading")
    })
}

function initializeLogin(e, r) {
    var t = $("#" + e), i = $("button", t), a = !1, n = $("form", t);
    i.click(function () {
        n.trigger("submit")
    }), $("input").keypress(function (e) {
        13 == e.which && (e.preventDefault(), n.trigger("submit"))
    }), n.submit(function (e) {
        if (i.button("loading"), a) return !0;
        var t = $(":input[name=username]", n).val(), o = $(":input[name=password]", n).val(),
            s = $(":input[name=bindToIp]", n).is(":checked") ? "t" : "f";
        return t && o ? (callSpec(r, {username: t, password: o, bindToIp: s}).done(function (e, r, t) {
            "OK" == e ? (a = !0, n.submit()) : (i.button("reset"), $("#wrong-password .alert-danger").text("Invalid username or password!"), $("#wrong-password").removeClass("hide"))
        }).fail(function () {
            i.button("reset"), $("#wrong-password .alert-danger").text("An error occured. Please try again!"), $("#wrong-password").removeClass("hide")
        }), void e.preventDefault()) : (i.button("reset"), !1)
    })
}

function initializeLogout(e) {
    $("#" + e).click(function (e) {
        var r = window.location.pathname;
        $.ajax({type: "POST", url: "/logout"}).done(function (e) {
            var t = r.indexOf("#");
            -1 != t && (r = r.slice(0, t)), window.location.href = r
        })
    })
}

function initializeEditDescription(e, r) {
    var t = $("#" + e + " > button"), i = $("#" + e + " .modal");
    t.click(function () {
        i.modal("show")
    }), $("button", i).click(function () {
        var e = {};
        $.each(["line1", "line2", "line3"], function () {
            e[this] = $("input[name=" + this + "]", i).val()
        }), callSpecAndReload(r, e)
    })
}

function initializeClickHandlerWithAction(e, r) {
    $("#" + e).click(function () {
        callSpecAndReload(r)
    })
}

function petAbilityTable(e, r, t, i, a) {
    function n(e, r) {
        o.push("<tr><td>"), o.push(e), o.push("</td><td>"), o.push(formatNumber(r)), o.push("</td></tr>")
    }

    var o = ['<table class="stats-table pet-ability-stats-table">'];
    return n("Level:", e), n("Points:", t), e != r && (n('<abbr title="Feed power needed for Next Level">Next</abbr>:', i + " fp"), n('<abbr title="Feed power needed for Max Level(' + r + ')">Max</abbr>:', a + " fp")), o.push("</table>"), o.join("")
}

function renderPetAbilityPopover(e, r, t) {
    $("#" + e + " td:nth-child(" + r + ") .pet-ability").each(function () {
        var e = $(this), r = e.data("pet-ability");
        e.html(r[1] + ' <i class="glyphicon glyphicon-info-sign"></i>'), e.popover({
            title: r[0],
            html: !0,
            content: petAbilityTable(r[1], r[2], r[3], r[4], r[5]),
            trigger: "click"
        })
    })
}

function completeData(e) {
    var r = document.cookie.match(/session=([0-9a-zA-Z]+)/);
    return r && r[1] && (e.session = r[1]), e
}

function callSpec(e, r) {
    return $.extend(e.data, r), completeData(e.data), $.ajax(e)
}

function callSpecAndReload(e, r, t) {
    var i = window.location.href;
    callSpec(e, r).done(function (e) {
        if (!t || t(e)) {
            var r = i.indexOf("#");
            -1 != r && (i = i.slice(0, r)), window.location.href = i
        }
    })
}

function initializeCookieConsentBanner(e) {
    $("#" + e + " .btn-primary").click(function () {
        var r = new Date;
        r.setYear(r.getFullYear() + 1), document.cookie = "gdprCookiePolicyAccepted=true;path=/;expires=" + r.toUTCString(), /gdprCookiePolicyAccepted=true/.test(document.cookie) || (alert("Your browser does not allow us to store this data for a longer time in a cookie. Your choice will only be in effect during this browsing session."), document.cookie = "gdprCookiePolicyAccepted=true;path=/"), $("#" + e).remove()
    })
}

function convertToLocalTime(e) {
    e.text(function (e, r) {
        if (!r) return "";
        var t = new Date(r);
        return [t.getFullYear(), "-", padWithZeros(t.getMonth() + 1, 2), "-", padWithZeros(t.getDate(), 2), " ", padWithZeros(t.getHours(), 2), ":", padWithZeros(t.getMinutes(), 2)].join("")
    })
}

function convertElementByIdToLocalTime(e) {
    convertToLocalTime($("#" + e))
}

function convertColumnToLocalTime(e, r) {
    convertToLocalTime($("#" + e + " td:nth-child(" + r + ")"))
}

function padWithZeros(e, r) {
    return e += "", e.length >= r ? e : new Array(r - e.length + 1).join("0") + e
}

function initializeAlertCloseButton(e, r) {
    $("#" + e).click(function () {
        document.cookie = "closedAlertVersion=" + r + ";path=/;expires=Wed, 01 Jan 2020 00:00:00 GMT"
    })
}

$.fn.blindLeftIn = function (e, r, t) {
    return this.animate({marginLeft: 0}, $.speed(e, r, t))
}, $.fn.blindLeftOut = function (e, r, t) {
    return this.animate({marginLeft: -this.outerWidth()}, $.speed(e, r, t))
}, window.storage = !1;
var fail, uid;
try {
    uid = new Date, (window.storage = window.localStorage).setItem(uid, uid), fail = storage.getItem(uid) != uid, storage.removeItem(uid), fail && (window.storage = !1)
} catch (e) {
}
window.console || (window.console = {
    log: function () {
    }
}), $.timeago.settings.allowFuture = !0, window.classInfos = [[768, "Rogue", "Rogues", [150, 100, 10, 0, 15, 15, 15, 10], [25, 5, 1, 0, 1.5, 1.5, .5, 1], [720, 252, 50, 25, 75, 75, 40, 50], [[0, "Classic", 0], [834, "Bandit", 15], [913, "Brigand", 59], [916, "Eligible Bachelor", 67], [8966, "Platinum Rogue", 72], [9031, "Slime Rogue", 48], [29808, "Jack the Ripper", 98], [8614, "Skuld Set Skin", 456], [29843, "Mini Skuld", 114], [10973, "Beefcake Rogue", 463], [313, "Snowcloaked Rogue", 133], [5910, "Rogue - Artist Extraordinaire", 142], [5999, "Rogue - Dungeon Mastermind", 145], [10933, "Rogue - Future Seeker Tester", 153], [10964, "Sheep Rogue", 162], [19157, "Red Outlaw", 177], [19404, "Thief Queen", 196], [19413, "Twilight Acolyte Rogue", 202], [19417, "Ordinary Box Rogue", 206], [19419, "Stone Statue Rogue", 208], [19494, "Beachcake Rogue", 465], [19563, "Bruno the Rogue Steward", 255], [19567, "Turkey Rogue", 259], [19617, "Heartless Dodger Rogue", 266], [6045, "Barefoot Rogue", 275], [8305, "Oryxmas Rogue", 280], [24600, "Roguish Business Partner", 301], [24640, "Lone Rogue", 307], [24694, "Raccoon Rogue", 312], [9222, "King of Thieves Rogue", 350], [9313, "Dapper Disguiser Rogue", 364], [322, "Lil Beach Rogue", 368], [2418, "Wererat Rogue", 372], [29521, "Cloaked Ascendant Rogue", 405], [9734, "Little Prince Rogue", 412], [29610, "Masked Rogue", 420], [29616, "Vampire Beast Rogue", 423], [6125, "Rogue - Supporter Extraordinaire", 427], [29641, "Ankou Rogue", 434], [24252, "Scorpion Hunter Rogue", 450]], 1], [775, "Archer", "Archers", [130, 100, 12, 0, 12, 12, 12, 10], [25, 5, 1.5, 0, 1, 1, .5, 1], [700, 252, 75, 25, 50, 50, 40, 50], [[0, "Classic", 1], [835, "Robin Hood", 16], [851, "Little Helper", 32], [855, "Cupid", 36], [904, "Slime Archer", 50], [888, "Ranger", 57], [29799, "Huntsman", 92], [312, "Inuit", 132], [5909, "Archer - Artist Extraordinaire", 142], [6007, "Archer - Dungeon Mastermind", 146], [10941, "Archer - Future Seeker Tester", 155], [10961, "Mini Nut", 159], [10966, "Sheep Archer", 164], [19371, "Elf Archers", 181], [19403, "Sunflower Archer", 195], [19414, "Ethereal Princess Archer", 203], [19416, "Guerilla Archer", 205], [19420, "Stone Statue Archer", 209], [19554, "Chu-Ko-Nu Archer", 246], [19559, "Underworld Archer", 251], [6114, "Water Lily Archer", 278], [8306, "Oryxmas Archer", 281], [24695, "Raven Archer", 313], [9145, "Magma Dweller Archer", 332], [9223, "Kings Bowman Archer", 351], [3586, "Tennis Player Archer", 380], [29850, "Storm Archer", 387], [6124, "Archer - Supporter Extraordinaire", 429], [24236, "Skeleton Archer", 442]], 2], [782, "Wizard", "Wizards", [100, 100, 12, 0, 10, 15, 12, 12], [25, 10, 1.5, 0, 1, 1.5, .5, 1], [670, 385, 75, 25, 50, 75, 40, 60], [[0, "Classic", 2], [836, "Merlin", 17], [848, "Elder Wizard", 29], [850, "Santa", 31], [914, "Gentleman", 56], [872, "Slime Wizard", 47], [9012, "Witch", 86], [29813, "Mischievous Imp", 103], [1026, "Twilight Archmage Set Skin", 457], [29844, "Mini Archmage", 115], [32658, "Wizard Supreme", 127], [32677, "Snow Queen", 130], [5912, "Wizard - Artist Extraordinaire", 142], [5994, "Wizard - Dungeon Mastermind", 144], [10937, "Wizard - Future Seeker Tester", 154], [10962, "Miss Shamrock", 160], [10965, "Sheep Wizard", 163], [10969, "The Flamingo", 167], [10971, "Dr. Spellbomb", 168], [19372, "Ordinary Magician", 182], [19421, "Stone Statue Wizard", 210], [19560, "Apprentice Wizard", 252], [19657, "Haunted Robe", 268], [6104, "Spooky Roommate Wizard", 276], [8307, "Oryxmas Wizard", 282], [24596, "Wizard of Christmas Present", 297], [24696, "Bunny Magician", 314], [9143, "Wicked Dragon Wizard", 330], [9216, "Court Wizard", 344], [9245, "Mysterious Wizard", 359], [9302, "Butterfly Wizard", 360], [3592, "Summer Vacation Wizard", 386], [19168, "Hermit Wizard", 390], [25104, "Random Mad Scientist", 402], [29522, "Old Man Wizard", 406], [6127, "Wizard - Supporter Extraordinaire", 428], [24244, "Bolt Caster Wizard", 446], [24246, "Spellmaster Wizard", 447]], 3], [784, "Priest", "Priests", [100, 100, 12, 0, 12, 12, 10, 15], [25, 10, 1, 0, 1.5, 1, .5, 1.5], [670, 385, 50, 25, 55, 55, 40, 75], [[0, "Classic", 3], [837, "Traditional", 18], [849, "Robed Priest", 30], [852, "Father Time", 33], [905, "Slime Priest", 46], [884, "Nun", 53], [29811, "Zombie Nurse", 101], [29786, "Geb Set Skin", 453], [29842, "Mini Geb", 113], [5864, "Ice King Priest", 139], [5914, "Priest - Artist Extraordinaire", 142], [5995, "Priest - Dungeon Mastermind", 144], [10943, "Priest - Future Seeker Tester", 156], [10967, "Sheep Priest", 165], [19156, "Shrine Priestess", 176], [19409, "Bard Priestess", 198], [19418, "Lifeguard Priest", 207], [19422, "Stone Statue Priest", 211], [19557, "Pandora Priestess", 249], [6041, "White Bag-chan Priestess", 271], [6043, "Cleopatra Priestess", 273], [8308, "Oryxmas Priest", 283], [24598, "Snowland Priestess", 299], [24638, "Lunar High Priestess", 305], [24639, "Dionysus Priest", 306], [24697, "Panda Priest", 315], [9144, "Ancient Archivist Priest", 331], [9148, "Ivory Priest", 335], [9225, "Carthusian Monk Priest", 353], [29852, "Hoodoo Priestess", 389], [6129, "Priest - Supporter Extraordinaire", 431], [24224, "Holy Guide Priest", 435], [24238, "Scrooge Priest", 443], [24248, "Archbishop Priest", 448]], 4], [797, "Warrior", "Warriors", [200, 100, 15, 0, 7, 10, 10, 10], [25, 5, 1.5, 0, 1, 1, 1.5, 1], [770, 252, 75, 25, 50, 50, 75, 50], [[0, "Classic", 4], [838, "Juggernaut", 19], [853, "Down Under", 34], [883, "Shoveguy", 52], [8967, "B.B. Wolf", 73], [8965, "Platinum Warrior", 71], [9032, "Slime Warrior", 49], [29790, "Skeleton Warrior", 89], [29816, "Hunchback", 95], [32718, "Dragon Tamer Set Skin", 462], [32701, "Dragon Tamer", 131], [1027, "Olive Gladiator", 458], [1028, "Ivory Gladiator", 459], [32675, "Rudolph the Berzerk", 128], [5878, "Warrior - Artist Extraordinaire", 142], [6e3, "Warrior - Dungeon Mastermind", 145], [10930, "Warrior - Future Seeker Tester", 152], [10963, "Sheep Warrior", 161], [10972, "Explorer", 171], [19410, "Princess Warrior", 199], [19411, "Light Cavalry Warrior", 200], [19423, "Stone Statue Warrior", 212], [19483, "Lodestar Warrior", 224], [19496, "Athena Warrior", 229], [19558, "Living Armor Warrior", 250], [19568, "Adorable Lil' Warrior", 260], [19655, "Gladiator", 116], [8309, "Oryxmas Warrior", 284], [24599, "Frost Raider Warrior", 300], [24642, "Sand Monk Warrior", 309], [24698, "Penguin Warrior", 316], [9140, "Harrowed Slinger Warrior", 327], [9203, "Scarecrow Warrior", 338], [9213, "Kingsman Cavalry Warrior", 341], [9244, "Rabbit Warrior", 358], [807, "Dragon Slayer Warrior", 369], [1301, "Angry Orc Warrior", 373], [6346, "Beefcake Brutus Warrior", 471], [3591, "Buckethead Warrior", 385], [24618, "Giant Sword Warrior", 391], [29520, "Lizardman Warrior", 404], [29523, "Singer Warrior", 407], [6119, "Warrior - Supporter Extraordinaire", 426], [29639, "Gravekeeper Warrior", 433], [24230, "Armored Champion Warrior", 438]], 5], [798, "Knight", "Knights", [200, 100, 15, 0, 7, 10, 10, 10], [25, 5, 1.5, 0, 1, 1, 1.5, 1], [770, 252, 50, 40, 50, 50, 75, 50], [[0, "Classic", 5], [839, "Knight of the Round", 20], [903, "Slime Knight", 45], [902, "Iceman", 65], [8964, "Platinum Knight", 70], [29818, "Frankenstein's Monster", 97], [2521, "Slurp Knight", 122], [1025, "Oryx Set Skin", 452], [29847, "Mini Oryx", 110], [5860, "Penguin Knight", 135], [5861, "Frimar Knight", 136], [5880, "Knight - Artist Extraordinaire", 142], [6004, "Knight - Dungeon Mastermind", 145], [10931, "Knight - Future Seeker Tester", 152], [19159, "Shield Maiden", 179], [19373, "Heroic Knight", 183], [19415, "Antique Diver Knight", 204], [19424, "Stone Statue Knight", 213], [19549, "Knight Lady", 241], [19556, "Monster Hunter Knight", 248], [19566, "Haunted Knight", 258], [6039, "Ducky Knight", 269], [8310, "Oryxmas Knight", 285], [24641, "Wise Swine Knight", 308], [24699, "Turtle Knight", 317], [9209, "Templar Knight", 339], [9214, "Kingsman Guard Knight", 342], [9241, "Lustrous Champion Knight", 355], [3588, "Snorkeler Knight", 382], [25102, "Silex Almighty Knight", 401], [29524, "Grail Warden Knight", 408], [6122, "Knight - Supporter Extraordinaire", 426], [24234, "Skeleton Knight", 441], [24240, "Glacius Knight", 444]], 6], [799, "Paladin", "Paladins", [200, 100, 12, 0, 12, 10, 10, 10], [25, 5, 1.5, 0, 1, 1, .5, 1.5], [770, 252, 50, 30, 55, 45, 40, 75], [[0, "Classic", 6], [840, "Decorated Paladin", 21], [854, "Founding Father", 35], [915, "Bashing Bride", 66], [885, "Holy Avenger", 54], [9030, "Slime Paladin", 44], [29800, "Demon Spawn", 93], [29788, "Swoll Paladin Set Skin", 455], [29845, "Mini Swoll", 112], [32654, "Headless Rider", 124], [32656, "Pilgrim Father", 125], [32676, "Miss Santa", 129], [5879, "Paladin - Artist Extraordinaire", 142], [6003, "Paladin - Dungeon Mastermind", 145], [10932, "Paladin - Future Seeker Tester", 152], [10974, "Iron Maiden", 170], [19390, "Patriot Paladin", 190], [19425, "Stone Statue Paladin", 214], [19487, "Mad Dwarf Paladin", 228], [19497, "Valkyrie Paladin", 230], [19553, "Cleaner Maid Paladin", 245], [19569, "Nerd Paladin", 261], [6042, "Monkey King Paladin", 272], [8311, "Oryxmas Paladin", 286], [24636, "Halberdier Paladin", 304], [24700, "Mouse Paladin", 318], [9141, "Oni Paladin", 328], [9215, "Kingsman Armorbearer Paladin", 343], [9243, "Poisson d'Avril Paladin", 357], [9311, "Blessed Champion Paladin", 362], [9312, "Sworded Inquisitor Paladin", 363], [1332, "Monk Paladin", 375], [3590, "Banana Boat Paladin", 384], [29851, "Foreign Prince Paladin", 388], [6120, "Paladin - Supporter Extraordinaire", 426], [24250, "Hero Paladin", 449]], 7], [800, "Assassin", "Assassins", [150, 100, 12, 0, 15, 15, 15, 10], [25, 5, 1, 0, 1.5, 1.5, .5, 1.5], [720, 252, 60, 25, 75, 75, 40, 60], [[0, "Classic", 7], [841, "Stealth", 22], [912, "Agent", 51], [9029, "Slime Assassin", 43], [29770, "Puppet Master", 87], [29791, "Infected Assassin", 91], [29814, "Vampire Hunter", 104], [3036, "Parasitic Host Set", 470], [5911, "Assassin - Artist Extraordinaire", 142], [6001, "Assassin - Dungeon Mastermind", 145], [10934, "Assassin - Future Seeker Tester", 153], [6024, "Romeo", 149], [10970, "Mini Stheno", 169], [19375, "Dark Elf Assassin", 185], [19389, "Redcoat Assassin", 189], [19426, "Stone Statue Assassin", 215], [19484, "Alice Assassin", 225], [19546, "Plague Doctor Assassin", 238], [19565, "Vampire Groom Assassin", 257], [19613, "Schankmaid Assassin", 262], [6115, "Arms Merchant Assassin", 279], [8312, "Oryxmas Assassin", 287], [24601, "Snowball Kid Assassin", 302], [24634, "Champagne Lady Assassin", 303], [24701, "Blue Frog Assassin", 319], [9220, "Blackguard Mercenary Assassin", 348], [1305, "Mini Flesh Collector", 374], [2180, "Hazmat Suit Assassin", 376], [3587, "Beach Assassin", 381], [29608, "Peddler Assassin", 419], [29618, "Gravekeeper Assassin", 424], [6126, "Assassin - Supporter Extraordinaire", 427]], 8], [801, "Necromancer", "Necromancers", [100, 100, 12, 0, 10, 15, 10, 12], [25, 10, 1.5, 0, 1, 1.5, .5, 1.5], [670, 385, 75, 25, 50, 60, 30, 75], [[0, "Classic", 8], [842, "Death Mage", 23], [898, "Witch Doctor", 61], [9028, "Slime Necromancer", 42], [29810, "Tiny Avatar", 100], [19460, "Hollow King Set Skin", 468], [32766, "Vampire Lord", 123], [5862, "Frozen King", 137], [5913, "Necromancer - Artist Extraordinaire", 142], [5996, "Necromancer - Dungeon Mastermind", 144], [10938, "Necromancer - Future Seeker Tester", 154], [6026, "Carnivalmancer", 151], [19158, "Shadow Mage", 178], [19427, "Stone Statue Necromancer", 216], [19433, "Voodoo Magus Necromancer", 222], [19545, "Heartless Necromancer", 237], [19547, "Jack-o-mancer", 239], [19550, "Hollow Prince Necromancer", 242], [19562, "Lady Violetta Necromancer", 254], [19614, "Catrina Necromancer", 263], [19618, "Heart Thief Necromancer", 267], [8313, "Oryxmas Necromancer", 288], [24597, "Necro of Christmas Yet-to-Come", 298], [24702, "Anubis Necromancer", 320], [9212, "Skink Necromancer", 340], [9217, "Demon Summoner Necromancer", 345], [3589, "Beach Party Necromancer", 383], [6128, "Necromancer - Supporter Extraordinaire", 428]], 9], [802, "Huntress", "Huntresses", [130, 100, 12, 0, 12, 12, 12, 10], [25, 5, 1.5, 0, 1, 1, .5, 1], [700, 252, 75, 25, 50, 50, 40, 50], [[0, "Classic", 9], [843, "Amazonian", 24], [900, "Scarlett", 63], [901, "Artemis", 68], [8977, "Nexus no Miko", 83], [9027, "Slime Huntress", 41], [29789, "Ghost Huntress", 90], [29801, "Dark Elf Huntress", 94], [29848, "Mini Thessal", 109], [2299, "Swarming Huntress Set Skin", 464], [19407, "Mini Queen Bee Huntress", 197], [5968, "Huntress - Artist Extraordinaire", 143], [6006, "Huntress - Dungeon Mastermind", 146], [10942, "Huntress - Future Seeker Tester", 155], [6023, "Heartseeker", 148], [19154, "Woodland Huntress", 174], [19370, "Markswoman Huntress", 180], [19392, "Swimsuit Huntress", 192], [19428, "Stone Statue Huntress", 217], [19540, "Drake Hunter", 235], [19564, "Misery Ghost Bride Huntress", 256], [19616, "Sunrise Hunter", 265], [6113, "Eagle Eye Hunter", 277], [8314, "Oryxmas Huntress", 289], [24594, "Helping Huntress", 295], [24703, "Reptilian Hunter", 321], [9149, "Moonlight Elf Huntress", 336], [9224, "Forest Tracker Huntress", 352], [9310, "Demonhunter Huntress", 361], [6131, "Huntress - Supporter Extraordinaire", 429], [29637, "Gravekeeper Hunter", 432]], 10], [803, "Mystic", "Mystics", [100, 100, 10, 0, 12, 10, 15, 15], [25, 10, 1.5, 0, 1, 1, .5, 1.5], [670, 385, 60, 25, 60, 55, 40, 75], [[0, "Classic", 10], [844, "Seer", 25], [8968, "Lil Red", 74], [9026, "Slime Mystic", 40], [29815, "Poltergeist", 105], [29787, "Phylactery Set Skin", 454], [29846, "Mini Phylactery", 111], [32657, "Pilgrim Mother", 126], [5865, "Icicle Dial Mystic", 140], [5866, "Yuki Onna Mystic", 141], [5969, "Mystic - Artist Extraordinaire", 143], [5998, "Mystic - Dungeon Mastermind", 144], [10940, "Mystic - Future Seeker Tester", 154], [10960, "Leprechaun Mystic", 158], [10968, "Lil' Bo-Peep", 166], [19152, "Mystic Emeritus", 172], [19388, "Hula Mystic", 188], [19391, "Swimsuit Mystic", 191], [19412, "Clockwork Mystic", 201], [19429, "Stone Statue Mystic", 218], [19561, "Grand Enchantress Mystic", 253], [19615, "Lunar Mystic", 264], [6044, "Timelock Mystic", 274], [8315, "Oryxmas Mystic", 290], [24595, "Mystic of Christmas Past", 296], [24693, "Aphrodite Mystic", 311], [24704, "Mystical Owl", 322], [9218, "Wandering Gypsy Mystic", 346], [30054, "Lightning Mystic", 409], [6132, "Mystic - Supporter Extraordinaire", 428]], 11], [804, "Trickster", "Tricksters", [150, 100, 10, 0, 12, 15, 12, 12], [25, 5, 1.5, 0, 1.5, 1.5, .5, 1], [720, 252, 65, 25, 75, 75, 40, 60], [[0, "Classic", 11], [845, "Loki", 26], [917, "Deadly Vixen", 64], [8979, "Drow Trickster", 85], [8969, "King Knifeula", 75], [9014, "Slime Trickster", 39], [29771, "Jester", 88], [29817, "Vampiress", 96], [2301, "Lost Golem Set Skin", 466], [19529, "Mini Lost Golem Trickster", 232], [5859, "Chinese Dress Trickster", 134], [5970, "Trickster - Artist Extraordinaire", 143], [6005, "Trickster - Dungeon Mastermind", 145], [10935, "Trickster - Future Seeker Tester", 153], [6022, "Juliet", 147], [19155, "Bunny Trickster", 175], [19387, "Beach Trickster", 187], [19393, "Swimsuit Trickster", 193], [19430, "Stone Statue Trickster", 219], [19485, "Mad Hatter Trickster", 226], [19539, "Soubrette Trickster", 234], [8316, "Oryxmas Trickster", 291], [24593, "Santa Trickster", 294], [24669, "Gnome Trickster", 310], [24705, "Fox Trickster", 323], [9201, "Irish Dancer Trickster", 337], [9219, "Village Peasant Trickster", 347], [9320, "Jellyhead Trickster", 366], [6133, "Trickster - Supporter Extraordinaire", 427], [24226, "Jiangshi Trickster", 436], [24232, "Time Traveler Trickster", 440], [24254, "Night Elf Queen Trickster", 451]], 12], [805, "Sorcerer", "Sorcerers", [100, 100, 12, 0, 12, 12, 10, 15], [25, 10, 1.5, 0, 1.5, 1, 1.5, 1.5], [670, 385, 70, 25, 60, 60, 75, 60], [[0, "Classic", 12], [846, "Warlock", 27], [899, "Sorceress", 62], [8855, "Stanley the Spring Bunny", 69], [9013, "Slime Sorcerer", 38], [8976, "Ascended Sorcerer", 82], [3009, "Horrific Sorcerer Set Skin", 469], [5863, "Blizzard Sorcerer", 138], [5915, "Sorcerer - Artist Extraordinaire", 142], [5997, "Sorcerer - Dungeon Mastermind", 144], [10944, "Sorcerer - Future Seeker Tester", 156], [6025, "Mardi Gras Jester", 150], [19374, "Ancient Sorcerer", 184], [19385, "Cunning Sorcerer", 186], [19431, "Stone Statue Sorcerer", 220], [19482, "Undine Sorcerer", 223], [19486, "Queen Of Hearts Sorcerer", 227], [19498, "Nameless Sorcerer", 231], [19531, "Thunder God Sorcerer", 467], [19548, "Mini Malus Sorcerer", 240], [19552, "Candle Maid Sorceress", 244], [8317, "Oryxmas Sorcerer", 292], [24706, "Piglet Sorcerer", 324], [9146, "Yin Yang Sorcerer", 333], [9147, "Ebony Sorcerer", 334], [9226, "Royal Sorcerer", 354], [9242, "Discoverer Sorcerer", 356], [3010, "Mini Horrific", 138], [9314, "Wise Elder Sorcerer", 365], [28677, "Mini Horrific Sorcerer", 367], [402, "Inari Sorcerer", 370], [2416, "Indian Beauty Sorceress", 371], [29620, "Cultist of Unknown Origin", 425], [6130, "Sorcerer - Supporter Extraordinaire", 431]], 13], [806, "Ninja", "Ninjas", [150, 100, 15, 0, 10, 12, 10, 12], [25, 5, 1.5, 0, 1, 1.5, .5, 1.5], [720, 252, 70, 25, 60, 70, 40, 70], [[0, "Classic", 13], [847, "Shadow", 28], [856, "Slime Ninja", 37], [29809, "Death", 99], [29840, "Baby Djinja", 117], [29841, "Mini Rosen", 118], [1029, "Rosen Blade", 460], [1030, "Djinja", 461], [5881, "Ninja - Artist Extraordinaire", 142], [6002, "Ninja - Dungeon Mastermind", 416], [10936, "Ninja - Future Seeker Tester", 413], [10959, "Wind Flower Ninja", 157], [19153, "Silver Ninja", 173], [19394, "Slashing Beauty Ninja", 194], [19432, "Stone Statue Ninja", 221], [19541, "Pharaoh Ninja", 236], [19551, "Kabuki Ninja", 243], [19555, "Dark Rider Ninja", 247], [6040, "Gardener Ninja", 270], [8318, "Oryxmas Ninja", 293], [24707, "Feline Blade Ninja", 325], [9139, "Parasol Maiden Ninja", 326], [9142, "Dual Duelist Ninja", 329], [9221, "Sensei Ninja", 349], [8768, "Shark Hunter Ninja", 396], [25106, "Krathman", 403], [6123, "Ninja - Supporter Extraordinaire", 430]], 14], [785, "Samurai", "Samurai", [150, 100, 12, 0, 10, 10, 10, 12], [25, 5, 1.5, 0, 1, 1, .5, 1.5], [720, 252, 75, 25, 50, 50, 40, 60], [[0, "Classic", 14], [6278, "Oni Demon Samurai", 377], [24373, "Tattooed Yakuza Samurai", 378], [6276, "Cowboy Samurai", 379], [29794, "Wanderer Samurai", 392], [10253, "Stone Statue Samurai", 393], [8766, "Chonmage Samurai", 394], [8767, "Baywatch Samurai", 395], [8769, "Kilnmaster Samurai", 397], [8774, "Slime Samurai", 398], [8775, "Onna Bugeisha Samurai", 399], [18504, "Foreign General Samurai", 400], [30056, "Akuma SamuraiST", 472], [29988, "Mini Akuma", 410], [9732, "Masked Samurai", 411], [9736, "Samurai - Future Seeker Tester", 413], [9738, "Silent Samurai", 414], [29600, "Samurai - Artist Extraordinaire", 415], [29602, "Samurai - Dungeon Mastermind", 416], [29604, "Shogun Samurai", 417], [29606, "Airflow Samurai", 418], [29612, "Cyberpunk Samurai", 421], [29614, "Sushi Chef Samurai", 422], [6121, "Samurai - Supporter Extraordinaire", 430], [24228, "Royal Champion Samurai", 437], [19659, "Oryxmas Samurai", 439], [24242, "Guillotiner Samurai", 445]], 15]], window.classInfoById = {};
for (var i = 0; i < classInfos.length; ++i) classInfoById[classInfos[i][0]] = classInfos[i];
window.rankBoundaries = [];
for (var n = window.classInfos.length, i = n - 1; 5 * n >= i; i += n) window.rankBoundaries.push(i);
window.rankBoundaries.push(5 * window.classInfos.length), window.rankColors = ["light-blue", "blue", "red", "orange", "yellow", "white"], $.tablesorter.addParser({
    id: "guildRank",
    is: function (e) {
        return !1
    },
    format: function (e) {
        switch (e) {
            case"Founder":
                return 5;
            case"Leader":
                return 4;
            case"Officer":
                return 3;
            case"Member":
                return 2;
            case"Initiate":
                return 1;
            default:
                return 0
        }
    },
    type: "numeric"
}), $.tablesorter.addParser({
    id: "petRarity", is: function (e) {
        return !1
    }, format: function (e) {
        switch (e) {
            case"Divine":
                return 5;
            case"Legendary":
                return 4;
            case"Rare":
                return 3;
            case"Uncommon":
                return 2;
            case"Common":
                return 1;
            default:
                return 0
        }
    }, type: "numeric"
}), $.tablesorter.addParser({
    id: "accountCreated", is: function (e) {
        return !1
    }, format: function (e, r, t) {
        return $("span", t).data("rank")
    }, type: "numeric"
}), $.tablesorter.addParser({
    id: "guildStarDistribution", is: function (e) {
        return !1
    }, format: function (e, r, t) {
        return $(".guild-star-distribution", t).data("sorter")
    }, type: "numeric"
}), $(function () {
    function e() {
        $(".table-responsive").each(function () {
            var e = !!$(".scroll-alert", this).length;
            this.scrollWidth > this.clientWidth ? e || $("table", this).before('<small style="margin-left: 4px" class="label label-default scroll-alert">Scroll the table horizontally to see all columns!</small>') : e && $(".scroll-alert", this).remove()
        })
    }

    $("span.numeric").text(function (e, r) {
        return formatNumber(r)
    }), $("span.timeago").timeago(), $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (e) {
        e.preventDefault(), e.stopPropagation(), $("ul.dropdown-menu [data-toggle=dropdown]").parent().removeClass("open"), $(this).parent().addClass("open")
    }), $(window).on("resize", e), e()
}), window.RealmEye = {
    converter: function () {
        return this.converterObject || (this.converterObject = new Showdown.converter)
    }, sanitizer: function () {
        return this.sanitizerObject || (this.sanitizerObject = new Sanitize(Sanitize.Config.RELAXED))
    }, sanitize: function (e, r) {
        var t = this.converter().makeHtml(r || e.text()), i = $("<div>" + t + "</div>"),
            a = this.sanitizer().clean_node(i[0]);
        e.empty().append(a)
    }, initializeEditor: function (e, r, t, i, a, n) {
        function o() {
            t.is(":checked") ? (i.addClass("markdown"), RealmEye.sanitize(i, e.val())) : (i.removeClass("markdown"), i.text(e.val()))
        }

        e.data("ajaxSpec") !== a && (e.data("ajaxSpec", a), e.off(), r.off(), t.off(), a.data.body && e.val(a.data.body), t.prop("checked", "t" == a.data.markdown), t.change(o), e.on("input propertychange", o), r.click(function () {
            r.attr("disabled", "disabled").addClass("disabled").off();
            var i = {body: e.val(), markdown: t.is(":checked") ? "t" : "f"};
            n && n(i), callSpecAndReload(a, i)
        }), o())
    }
};