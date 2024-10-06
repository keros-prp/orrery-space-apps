export class CuerpoCeleste {
    name: string = '';
    T: number = 0;
    a: number = 0;
    e: number = 0;
    I: number = 0;
    L: number = 0;
    w: number = 0;
    W: number = 0;
    trajectory: number[][] = [];
    constructor(name: string, a0: number, ap: number, e0: number, ep: number, I0: number, Ip: number, L0: number, Lp: number, w0: number, wp:number, W0: number, Wp: number) {
        this.name = name;
        this.T = (normalDateToJD(new Date()) - 2451545) / 36525;
        this.a = a0 + this.T * ap;
        this.e = e0 + this.T * ep;
        this.I = I0 + this.T * Ip;
        this.L = L0 + this.T * Lp;
        this.w = w0 + this.T * wp;
        this.W = W0 * this.T * Wp;
    }

    propagate(clock: number) {
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

        // return [xecl, yecl, zecl];
        return [x,y,0];
    }

    public calcTrajectory(): number[][] {
        this.trajectory = [];
        for (let clock = 1; clock <= 400; clock++) {
            console.log(this.name);
            const loc = this.propagate(clock);
            this.trajectory.push(loc.map((v) => v * 100));
        }
        return this.trajectory;
    }

    public getTrajectory(): number[][] {
        return this.trajectory;
    }
}

function cos(x: number): number {
    return Math.cos(x);
}

function sin(x: number): number {
    return Math.sin(x);
}

function KeplerStart(e: number, M: number): number {
    return M - e * sin(M);
}

function eps3(e: number, M: number, x: number): number {
    const t1 = cos(x);
    const t2 = -1 + e * t1;
    const t3 = sin(x);
    const t4 = e*t3;
    const t5 = -x + t4 + M;
    const t6 = t5/(1/2 * t5 * t4/t2 + t2);
    return t5/((1/2 * t3 - 1/6 * t1 * t6) * e * t6 + t2);
}

function normalDateToJD(date: Date): number {
    const epochTime = new Date('1970-01-01T00:00:00.000Z');
    const millisecondsPerDay = 86400000;
    const julianEpoch = 2440587.5;
    const dateMilliseconds = date.getTime();
    const dateRelativeToEpoch = dateMilliseconds - epochTime.getTime();
    const jd = (dateRelativeToEpoch / millisecondsPerDay) + julianEpoch;
    return jd;
}

function KeplerSolve(e: number, M: number): number {
    const tol = 1.0e-3;
    const Mnorm = M % (2 * Math.PI) - Math.PI;
    let E: number = 0;
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
