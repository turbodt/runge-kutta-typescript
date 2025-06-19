import { ButcherTableau } from "./butcher-tableaux";


export const rkdp45ButcherTableau = new ButcherTableau(7);
rkdp45ButcherTableau.a[1][0] = 1/5;
rkdp45ButcherTableau.a[2][0] = 3/40;
rkdp45ButcherTableau.a[2][1] = 9/40;
rkdp45ButcherTableau.a[3][0] = 44/45;
rkdp45ButcherTableau.a[3][1] = -56/15;
rkdp45ButcherTableau.a[3][2] = 32/9;
rkdp45ButcherTableau.a[4][0] = 19372/6561;
rkdp45ButcherTableau.a[4][1] = -25360/2187;
rkdp45ButcherTableau.a[4][2] = 64448/6561;
rkdp45ButcherTableau.a[4][3] = -212/729;
rkdp45ButcherTableau.a[5][0] = 9017/3168;
rkdp45ButcherTableau.a[5][1] = -355/33;
rkdp45ButcherTableau.a[5][2] = 46732/5247;
rkdp45ButcherTableau.a[5][3] = 49/176;
rkdp45ButcherTableau.a[5][4] = -5103/18656;
rkdp45ButcherTableau.a[6][0] = 35/384;
rkdp45ButcherTableau.a[6][1] = 0;
rkdp45ButcherTableau.a[6][2] = 500/1113;
rkdp45ButcherTableau.a[6][3] = 125/192;
rkdp45ButcherTableau.a[6][4] = -2187/6784;
rkdp45ButcherTableau.a[6][5] = 11/84;
rkdp45ButcherTableau.makeItConsistent();

rkdp45ButcherTableau.b[0] = 35/384;
rkdp45ButcherTableau.b[1] = 0;
rkdp45ButcherTableau.b[2] = 500/1113;
rkdp45ButcherTableau.b[3] = 125/192;
rkdp45ButcherTableau.b[4] = -2187/6784;
rkdp45ButcherTableau.b[5] = 11/84;
rkdp45ButcherTableau.b[6] = 0;
