import { z, ZodErrorMap, ZodIssue } from "zod";

type ZodInvalidStringIssue = ZodIssue & { validation: string };
type ZodTooSmallIssue = ZodIssue & { type: string; minimum: number };

const ERROR_CODE_MAP = {
	invalid_string: (issue: ZodInvalidStringIssue) => {
		const validationMap: Record<string, string> = {
			email: "InvalidEmail",
			uuid: "InvalidToken",
		};
		return validationMap[issue.validation] || "RequiredField";
	},

	too_small: (issue: ZodTooSmallIssue, path: string) => {
		if (issue.type !== "string") return "RequiredField";

		const minSizeMap: Record<number, Record<string, string>> = {
			1: {
				email: "EmailRequired",
				token: "TokenRequired",
				password: "PasswordRequired",
				newPassword: "PasswordRequired",
				default: "RequiredField",
			},
			8: {
				default: "PasswordTooShort",
			},
		};

		const sizeMap = minSizeMap[issue.minimum];
		return sizeMap?.[path] || sizeMap?.default || "RequiredField";
	},
};

export function createZodErrorMap(t: (_key: string) => string): ZodErrorMap {
	return (issue) => {
		const path = issue.path?.[issue.path.length - 1]?.toString() || "";

		let translationKey = "RequiredField";

		if (issue.code === "invalid_string") {
			translationKey = ERROR_CODE_MAP.invalid_string(
				issue as ZodInvalidStringIssue,
			);
		} else if (issue.code === "too_small") {
			translationKey = ERROR_CODE_MAP.too_small(
				issue as ZodTooSmallIssue,
				path,
			);
		}

		return { message: t(translationKey) };
	};
}

export function initializeGlobalZodErrorMap(
	validationTranslations: Record<string, string>,
) {
	const errorMap = createZodErrorMap(
		(key: string) => validationTranslations[key] || key,
	);
	z.setErrorMap(errorMap);
}
