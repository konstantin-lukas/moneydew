import {Money} from "../src/money";
import {MoneyFormatter, position} from "../src/money_formatter";

describe('Money Formatter class', () => {
    describe('The private addDigits method', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        it('should format a string to USD by default', () => {
            expect(formatter.getFormattedString(money)).toBe('$ 1,000.00');
            money.setValue('10000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 10,000.00');
            money.setValue('100000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 100,000.00');
            money.setValue('1000000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 1,000,000.00');
            money.setValue('10000000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 10,000,000.00');
            money.setValue('100000000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 100,000,000.00');
            money.setValue('1000000000.00');
            expect(formatter.getFormattedString(money)).toBe('$ 1,000,000,000.00');
            money.setValue('-1.00');
            expect(formatter.getFormattedString(money)).toBe('$ -1.00');
            money.setValue('-1');
            expect(formatter.getFormattedString(money)).toBe('$ -1');
        });
    });
    describe('The setSymbol method', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        it('should change the position of the currency symbol when formatting', () => {
            formatter.setSymbolPosition(position.BACK);
            money.setValue('-1');
            expect(formatter.getFormattedString(money)).toBe('-1 $');
        });
    });
    describe('The setDigitCharacters', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        it('should set the characters used for the digits', () => {
            formatter.setDigitCharacters(['???','???','???','???','???','???','???','???','???','???'])
            formatter.setSymbolPosition(position.FRONT);
            money.setValue('1000.00');
            expect(formatter.getFormattedString(money)).toBe('$ ???,?????????.??????');
        });
        it('should reject string longer or shorter than length 10', () => {
            expect(() => formatter.setDigitCharacters([])).toThrowError();
            expect(() => formatter.setDigitCharacters(['???','???','???','???','???','???','???','???','???'])).toThrowError();
            expect(() => formatter.setDigitCharacters(['???','???','???','???','???','???','???','???','???','???','???'])).toThrowError();
        });
    });
    describe('The setSymbolSeparator should set the string that separates the currency symbol from the numbers', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        formatter.setSymbolSeparator('');
        expect(formatter.getFormattedString(money)).toBe('$1,000.00');
        formatter.setSymbolPosition(position.BACK);
        expect(formatter.getFormattedString(money)).toBe('1,000.00$');
    });
    describe('The getFormattedMyriadString method should', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        it('should reject money values with decimal places', () => {
            expect(() => formatter.getFormattedMyriadString(money)).toThrowError();
        });
    });
    describe('The getFormattedMyriadString method should', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1500');
        formatter.setSymbolPosition(position.BACK);
        formatter.setSymbolSeparator('');
        it('should return the currency in a myriad format like in many east asian languages', () => {
            expect(formatter.getFormattedMyriadString(money)).toBe('???5???$');
            money.setValue('150');
            expect(formatter.getFormattedMyriadString(money)).toBe('???5???$');
            money.setValue('15');
            expect(formatter.getFormattedMyriadString(money)).toBe('???5$');
            money.setValue('5');
            expect(formatter.getFormattedMyriadString(money)).toBe('5$');
            money.setValue('15233');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???5???2???3???3$');
            money.setValue('215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('2???1???5???2???3???3$');
            money.setValue('5215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('5???2???1???5???2???3???3$');
            money.setValue('15215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???5???2???1???5???2???3???3$');
            money.setValue('25215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('2???5???2???1???5???2???3???3$');
            money.setValue('125215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???2???5???2???1???5???2???3???3$');
            money.setValue('225215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('2???2???5???2???1???5???2???3???3$');
            money.setValue('1000225215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???2???2???5???2???1???5???2???3???3$');
            money.setValue('1152225215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???1???5???2???2???2???5???2???1???5???2???3???3$');
            money.setValue('1000000000000');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???$');
            money.setValue('1000010000000');
            expect(formatter.getFormattedMyriadString(money)).toBe('1???1??????$');
            money.setValue('10000000');
            expect(formatter.getFormattedMyriadString(money)).toBe('1??????$');
            money.setValue('1000');
            expect(formatter.getFormattedMyriadString(money)).toBe('???$');
            money.setValue('52025215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('5???2??????2???5???2???1???5???2???3???3$');
            money.setValue('51025215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('5?????????2???5???2???1???5???2???3???3$');
            money.setValue('11025215233');
            expect(formatter.getFormattedMyriadString(money)).toBe('?????????2???5???2???1???5???2???3???3$');
            money.setValue('11025215233110252152331102521523311025215233110252152331102521523311025215233110252152331102521523311025215233110252152331102521523311025215233');
            expect(() => formatter.getFormattedMyriadString(money)).toThrowError();
            money.setValue('0');
            expect(formatter.getFormattedMyriadString(money)).toBe('0$');
            formatter.setSymbolPosition(position.FRONT);
            expect(formatter.getFormattedMyriadString(money)).toBe('$0');
            money.setValue('10');
            expect(formatter.getFormattedMyriadString(money)).toBe('$???');
            money.setValue('20');
            expect(formatter.getFormattedMyriadString(money)).toBe('$2???');
        });
    });
    describe('The setMyriadCharacters method should', () => {
        let formatter : MoneyFormatter = new MoneyFormatter();
        let money : Money = new Money('1000.00');
        it('should change the characters used by the myriad formatter', () => {
            formatter.setMyriadCharacters(['OOF','YIKES']);
            expect(() => formatter.getFormattedMyriadString(money)).toThrowError();
        });
    });
});
