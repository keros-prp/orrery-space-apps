function cos(x) {
    return Math.cos(x);
}

function sin(x) {
    return Math.sin(x);
}

function KeplerStart(e, M) {
    return M - e * sin(M);
}

function eps3(e, M, x) {
    const t1 = cos(x);
    const t2 = -1 + e * t1;
    const t3 = sin(x);
    const t4 = e*t3;
    const t5 = -x + t4 + M;
    const t6 = t5/(1/2 * t5 * t4/t2 + t2);
    return t5/((1/2 * t3 - 1/6 * t1 * t6) * e * t6 + t2);
}

function normalDateToJD(date) {
    const epochTime = new Date('1970-01-01T00:00:00.000Z');
    const millisecondsPerDay = 86400000;
    const julianEpoch = 2440587.5;
    const dateMilliseconds = date.getTime();
    const dateRelativeToEpoch = dateMilliseconds - epochTime.getTime();
    const jd = (dateRelativeToEpoch / millisecondsPerDay) + julianEpoch;
    return jd;
}

function KeplerSolve(e, M) {
    const tol = 1.0e-3
    const Mnorm = M % (2 * Math.PI) - Math.PI;
    let E;
    let E0 = KeplerStart(e, Mnorm);
    let dE = tol + 1;
    let count = 0;

    while (dE > tol) {
        E = E0 - eps3(e, Mnorm, E0);
        dE = Math.abs(E - E0);
        E0 = E;
        count++;

        if (count == 32) {
            console.error("Ya valió madres");
            break
        }
    }

    return E;
}



class CuerpoCeleste {
    constructor(name, a0, ap, e0, ep, I0, Ip, L0, Lp, w0, wp, W0, Wp) {
        this.name = name;
        this.T = (normalDateToJD(new Date()) - 2451545) / 36525;
        this.a = a0 + this.T * ap;
        this.e = e0 + this.T * ep;
        this.I = I0 + this.T * Ip;
        this.L = L0 + this.T * Lp;
        this.w = w0 + this.T * wp;
        this.W = W0 * this.T * Wp;
    }

    propagate(clock) {
        const period = 365.25
        const n = 2*Math.PI/period
        const tau = 0

        const M = n * (clock - tau)
        const E = KeplerSolve(this.e,M)
        const cose = cos(E)

        const x = this.a * (cose - this.e);
        const y = this.a * Math.sqrt(1 - this.e**2) * sin(E);

        const cos_w = cos(this.w);
        const sin_w = sin(this.w);

        const cos_W = cos(this.W);
        const sin_W = sin(this.W);

        const cos_I = cos(this.I);
        const sin_I = sin(this.I);

        const xecl = (cos_w*cos_W - sin_w*sin_W*cos_I) * x +
            (-sin_w*cos_W - sin_w*sin_W*cos_I) * y;
        const yecl = (cos_w*sin_W + sin_w*cos_W*cos_I) * x +
            (-sin_w*sin_W + cos_w*sin_W*cos_I) * y;
        const zecl = (sin_w*sin_I) * x + (cos_w*sin_I) * y;

        return [xecl, yecl, zecl];
    }

    drawTrajectory() {
        const orbcoords = [];
        for (let clock = 1; clock <= 366; clock++) {
            const loc = this.propagate(clock);
            orbcoords.push(loc);
            console.log(`${loc[0]}\t${loc[1]}\t${loc[2]}`);
        }
    }
}

const mercurio = new CuerpoCeleste("Mercurio", 0.38709927, 0.00000037, 0.20563593, 0.00001906, 7.00497902, -0.00594749, 252.25032350, 149472.67411175, 77.45779628, 0.16047689, 48.33076593, -0.12534081);
const venus = new CuerpoCeleste("Venus", 0.72333566, 0.00000390, 0.00677672, -0.00004107, 3.39467605, -0.00078890, 181.97909950, 58517.81538729, 131.60246718, 0.00268329, 76.67984255, -0.27769418);
const tierra = new CuerpoCeleste("Tierra", 1.00000261, 0.00000562, 0.01671123, -0.00004392, -0.00001531, -0.01294668, 100.46457166, 35999.37244981, 102.93768193, 0.32327364, 0, 0);
const marte = new CuerpoCeleste("Marte", 1.52371034, 0.00001847, 0.09339410, 0.00007882, 1.84969142, -0.00813131, -4.55343205, 19140.30268499, -23.94362959, 0.44441088);
const jupiter = new CuerpoCeleste("Júpiter", 5.20288700, -0.00011607, 0.04838624, -0.00013253, 1.30439695, -0.00183714, 34.39644051, 3034.74612775, 14.72847983, 0.21252668, 100.47390909, 0.20469106);
const saturno = new CuerpoCeleste("Saturno", 9.53667594, -0.00125060, 0.05386179, -0.00050991, 2.48599187, 0.00193609, 49.95424423, 1222.49362201, 92.59887831, -0.41897216, 113.66242448, -0.28867794);
const urano = new CuerpoCeleste("Urano", 19.18916464, -0.00196176, 0.04725744, -0.00004397, 0.77263783, -0.00242939, 313.23810451, 428.48202785, 170.95427630, 0.40805281, 74.01692503, 0.04240589);
const neptuno = new CuerpoCeleste("Neptuno", 30.06992276, 0.00026291, 0.00859048, 0.00005105, 1.77004347, 0.00035372, -55.12002969, 218.45945325);

const planetas = [mercurio, venus, tierra, jupiter]

urano.drawTrajectory();
