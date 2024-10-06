import type { AsyncWritable } from '@threlte/core';    
import { Texture } from 'three';    
export class CuerpoCeleste {
    name: string = '';

    T: number = 0;
    a: number = 0;
    a0: number = 0;
    ap: number = 0;
    e: number = 0;
    e0: number = 0;
    ep: number = 0;
    I: number = 0;
    I0: number = 0;
    Ip: number = 0;
    L: number = 0;
    L0: number = 0;
    Lp: number = 0;
    peri: number = 0;
    peri0: number = 0;
    perip: number = 0;
    an: number = 0;
    an0: number = 0;
    anp: number = 0;
    omega: number = 0;
    omega0: number = 0;
    omegap: number = 0;
    b: number = 0;
    c: number = 0;
    s: number = 0;
    f: number = 0;
    relPeriod: number = 1;
    public position: number[] = [];
    trajectory: number[][] = [];
    texture: AsyncWritable<Texture>

    static sunPos: number[] = [];

    constructor(name: string, a0: number, ap: number, e0: number, ep: number, I0: number, Ip: number, L0: number, Lp: number, peri0: number, perip:number, an0: number, anp: number, relPeriod: number, texture: AsyncWritable<Texture>) {
        this.a0 = a0;
        this.ap = ap;
        this.e0 = e0;
        this.ep = ep;
        this.texture = texture
        this.I0 = Math.PI * I0 / 180;
        this.Ip = Math.PI * Ip / 180;
        this.L0 = Math.PI * L0 / 180;
        this.Lp = Math.PI * Lp / 180;
        this.peri0 = Math.PI * peri0 / 180;
        this.perip = Math.PI * perip / 180;
        this.an0 = Math.PI * an0 / 180;
        this.anp = Math.PI * anp / 180;

        this.relPeriod = relPeriod;

        this.name = name;
        this.setT((CuerpoCeleste.normalDateToJD(new Date()) - 2451545) / 36525);
    }

    public setT(T: number) {
        this.T = T;
        this.updateParametersBasedOnTime();
    }

    updateParametersBasedOnTime() {
        this.a = this.a0 + this.T * this.ap;
        this.e = this.e0 + this.T * this.ep;
        this.I = this.I0 + this.T * this.Ip;
        this.L = this.L0 + this.T * this.Lp;
        this.peri = this.peri0 + this.T * this.perip;
        this.an = this.an0 * this.T * this.anp;

        this.omega = this.peri - this.an;
    }

    propagateOnClock(clock: number) {
        const period = 128;
        const n = 2*Math.PI/period;
        const tau = 0;

        const M = n * (clock - tau)

        return this.propagate(M);
    }

    propagateOnTime(clock: number) {
        const n = 2*Math.PI/this.relPeriod;
        const M = n * (clock);
        this.position = this.propagate(M).map((v: number) => v * 10);
        return this.position;
    }

    propagate(M: number) {
        const E = KeplerSolve(this.e,M);

        const x = this.a * (cos(E) - this.e);
        const y = this.a * Math.sqrt(1 - this.e**2) * sin(E);

        return this.make3DPos(x, y);
    }

    getSunPos(): number[] {
        const x = this.a * this.e;
        CuerpoCeleste.sunPos =  this.make3DPos(x, 0);
        return CuerpoCeleste.sunPos;
    }

    make3DPos(x: number, y: number): number[] {
        const cos_w = cos(this.omega);
        const sin_w = sin(this.omega);

        const cos_W = cos(this.an);
        const sin_W = sin(this.an);

        const cos_I = cos(this.I);
        const sin_I = sin(this.I);

        const xecl = (cos_w*cos_W - sin_w*sin_W*cos_I) * x +
            (-sin_w*cos_W - sin_w*sin_W*cos_I) * y;
        const yecl = (cos_w*sin_W + sin_w*cos_W*cos_I) * x +
            (-sin_w*sin_W + cos_w*cos_W*cos_I) * y;
        const zecl = (sin_w*sin_I) * x + (cos_w*sin_I) * y;

        return [xecl, yecl, zecl];
    }

    public calcTrajectory(): number[][] {
        this.trajectory = [];
        for (let clock = 1; clock <= 129; clock++) {
            const loc = this.propagateOnClock(clock);
            this.trajectory.push(loc.map((v: number) => v * 10));
        }
        return this.trajectory;

    }

    public getTrajectory(): number[][] {
        return this.trajectory;
    }

    public getPosition(): number[] {
        return this.position;
    }

    static normalDateToJD(date: Date): number {
        const epochTime = new Date('1970-01-01T00:00:00.000Z');
        const millisecondsPerDay = 86400000;
        const julianEpoch = 2440587.5;
        const dateMilliseconds = date.getTime();
        const dateRelativeToEpoch = dateMilliseconds - epochTime.getTime();
        const jd = (dateRelativeToEpoch / millisecondsPerDay) + julianEpoch;
        return jd;
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

        if (count == 8) {
            console.error("Could not converge kepler-equation solver...");
            break
        }
    }

    return E;
}
