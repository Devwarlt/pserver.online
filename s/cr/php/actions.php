<?php
/**
 * Created by PhpStorm.
 * User: devwarlt
 * Date: 17/02/2019
 * Time: 23:50
 */

if (!isset($_POST["packetId"])) {
    Utils::redirect404();
} else {
    handlePacket($_POST["packetId"]);
}

function handlePacket($packet)
{
    switch ($packet) {
        case "WELCOME":
            $welcome_page = Utils::getPserverPath(null, "welcome", Utils::$html);
            require($welcome_page);
            die();
        case "DONATE":
            $donation_page = Utils::getPserverPath(null, "donation", Utils::$html);
            require($donation_page);
            die();
        case "WEBSITE":
            $requestId = $_POST['requestId'];
            $pageTarget = $_POST['pageTarget'];

            if (!isset($requestId) || !isset($pageTarget))
                $requestId = "nil";

            switch ($requestId) {
                case "valor":
                    $process_page = Utils::getPserverPath($requestId, $pageTarget, $pageTarget == "index" || $pageTarget == "wiki" ? Utils::$php : Utils::$html);

                    if (file_exists($process_page))
                        require($process_page);
                    else
                        Utils::redirect404();
                    die();
                case "nil":
                default:
                    Utils::redirect404();
                    die();
            }
        default:
            Utils::redirect404();
            die();
    }
}

class Utils
{
    public static $php = "php";
    public static $html = "html";

    public static function redirect404()
    {
        echo '<script type="text/javascript">location.href = "' . self::getCurrentURL() . '404.' . self::$html . '"</script>';
    }

    public static function getCurrentURL()
    {
        return (stripos($_SERVER['SERVER_PROTOCOL'], 'https') === true ? 'https://' : 'http://') . $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'] . "/";
    }

    public static function pageTemplate($name)
    {
        echo '
        <link rel="preload" href="/s/cr/css/wiki.css" as="style">
        <div class="row">
            <div class="col-md-9">
                <h1>
                    <small><img class="img-outline" style="margin-bottom: 16px"
                                src="/s/cr/img/' . $name . '/' . $name . '-icon.png"
                                width="64px" height="64px"/></small>
                    <strong>Valor</strong>
                    <small title="Verified"><i class="glyphicon glyphicon-ok-sign" style="color: lightgreen"></i></small>
                </h1>
            </div>
            <div class="col-md-9">
                <div class="wiki-page" id="d">
                    <p style="color: #696969">
                        <small><i class="glyphicon glyphicon-pencil"></i>
                            Last modified ' . self::getLastModified($name) . '
                        </small>
                    </p>
                    <div id="dynamic-internal-content"></div>
                </div>
            </div>
            <div class="col-md-3 wiki-sidebar">
                <nav>
                    <ul class="nav nav-stacked">
                        <li class="nav-header">Navigation</li>
                        <li id="' . $name . '-home"><a href="#">Home</a></li>
                        <li id="' . $name . '-wiki"><a href="#">Wiki</a></li>
                        <li id="' . $name . '-about"><a href="#">About</a></li>
                        <li id="' . $name . '-contact"><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <link href="/s/cr/css/wiki.css" rel="stylesheet">
        <link href="/s/cr/css/re.css" rel="stylesheet">
        <script type="text/javascript">        
            $(document).ready(function () {
                addEventPrefix("home", "' . $name . '", "WEBSITE");
                addEventPrefix("wiki", "' . $name . '", "WEBSITE");
                addEventPrefix("about", "' . $name . '", "WEBSITE");
                addEventPrefix("contact", "' . $name . '", "WEBSITE");
            });

            function addEventPrefix(target, prefix, packetId) {
                $("#" + prefix + "-" + target).click(function () {
                    $.post(actions, {requestId: prefix, packetId: packetId, pageTarget: target}).done(function (data) {
                        $("#dynamic-internal-content").html(data);
                    });
                });
            }
        </script>
        ';
    }

    public static function getLastModified($dir)
    {
        return date("l, dS F Y, H:i:s", filemtime(self::getPserverPath($dir, null, null))) . " " . date('T');
    }

    public static function getPserverPath($dir, $file, $extension)
    {
        $path = "/../../pservers/";

        if ($dir == null)
            return __DIR__ . $path . "$file.$extension";

        if ($file == null)
            return __DIR__ . $path . "$dir/";

        return __DIR__ . $path . "$dir/$file.$extension";
    }

    public static function wikiTemplate($name)
    {
        echo '
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header" style="pointer-events: none"><a class="navbar-brand"><strong>Wiki</strong> <small><span class="glyphicon glyphicon-info-sign"></span></small></a>
                </div>
                <ul class="nav navbar-nav">
                    <li id="items"><a href="#">Items</a></li>
                    <li id="classes"><a href="#">Classes</a></li>
                    <li id="dungeons"><a href="#">Dungeons</a></li>
                    <li id="game-features"><a href="#">Game Features</a></li>
                    <li id="faq"><a href="#">FAQ</a></li>
                </ul>
            </div>
        </nav>
        
        <p id="sub-title"></p>
        
        <div id="sub-content"></div>
        
        <script type="text/javascript">
            $(document).ready(function () {
                [
                  "items", "classes", "dungeons", "game-features", "faq"  
                ].forEach(function (value) {
                    addSubEventPrefix(value, "' . $name . '", "WEBSITE", "extra/", true, "sub-content");
                });
            });
        
            function addSubEventPrefix(target, prefix, packetId, folder, changeTitle, alternativeContent) {
                $("#" + target).click(function () {
                    $.post(actions, {
                        requestId: prefix,
                        packetId: packetId,
                        pageTarget: folder + target
                    }).done(function (data) {
                        if (changeTitle)
                            $("#sub-title").html("<h3><strong>" + $("#" + target).text() + "</strong></h3>");
                        $("#" + alternativeContent).html(data);
                    });
                });
            }
        </script>
        ';
    }
}