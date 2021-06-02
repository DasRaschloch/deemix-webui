import { checkNewRelease } from '../../../src/utils/dates.js'

describe('date utils', () => {
	describe('checkNewRelease', () => {
		it("returns true with today's date", () => {
			expect(checkNewRelease(new Date())).toBe(true)
		})
	})
})
