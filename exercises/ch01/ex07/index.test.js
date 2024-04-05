import { Point } from './index';

describe('Point', () => {
    it('add', () => {
        const p1 = new Point(3, 4);
        const p2 = new Point(1, 2);
        p1.add(p2);
        expect(p1.x).toBe(4);
        expect(p1.y).toBe(6);
    });
})