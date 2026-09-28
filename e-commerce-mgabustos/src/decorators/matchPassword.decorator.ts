import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({
	name: 'MatchPassword',
	async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
	validate(
		confirmPassword: string,
		args: ValidationArguments,
	): Promise<boolean> | boolean {
		const obj = args.object as Record<string, unknown>;
		const key = args.constraints[0] as string;
		const password = obj[key];

		if (password !== confirmPassword) {
			return false;
		}
		return true;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	defaultMessage(validationArguments?: ValidationArguments): string {
		return 'Password y ConfirmPassword no coinciden';
	}
}
