import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");

        // Material Design Bootstrap súgó: https://mdbootstrap.com/
        // Font Awesome:
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        // Google Fonts:
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        // Bootstrap core CSS:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        // Material Design Bootstrap:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");

        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        res.write("\nLegnagyobb közös osztó (LNKO) meghatározása:\n");
        res.write("k= ");
        let k: number = parseInt(params.k as string);
        if (isNaN(k)) {
            k = 20;
        }
        res.write(`<input type='text' name='k' value=${k} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write("l= ");
        let l: number = parseInt(params.l as string);
        if (isNaN(l)) {
            l = 60;
        }
        res.write(`<input type='text' name='l' value=${l} style='width:5em;' onChange='this.form.submit();'>\n`);
        while (k != l) {
            if (k > l) k = k - l;
            else l = l - k;
        }
        res.write(`A két szám LNKO-ja: ${k}`);
        res.write("\nLegnagyobb közös osztó (LNKO) meghatározása Euklidesz-i módszerrel:\n");
        res.write("g= ");
        let g: number = parseInt(params.g as string);
        if (isNaN(g)) {
            g = 60;
        }
        res.write(`<input type='text' name='g' value=${g} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write("h= ");
        let h: number = parseInt(params.h as string);
        if (isNaN(h)) {
            h = 20;
        }
        res.write(`<input type='text' name='h' value=${h} style='width:5em;' onChange='this.form.submit();'>\n`);
        let m: number = parseInt(params.m as string);
        do {
            m = g % h; //maradékos osztás
            g = h; //előző maradék
            h = m; //új maradék
        } while (m != 0);
        res.write(`A két szám LNKO-ja Euklidesz-i módszerrel: ${g}`);
        res.write("\n\nEgyszerű Hello World!\n");

        // Tetszőleges html teg-ek és attribútumok beépítése:
        res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");

        // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
        let korod: number = parseInt(params.kor as string);
        // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
        // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:
        if (isNaN(korod)) korod = 18;

        res.write(`Kérem a korod: <input type='number' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`Te ${korod} éves vagy!\n`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");

        // JQuery:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>");
        // Bootstrap tooltips:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js'></script>");
        // Bootstrap core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js'></script>");
        // MDB core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/js/mdb.min.js'></script>");

        res.write("</body></html>");
        res.end();
    }
}
