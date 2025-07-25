import { z } from "zod";
import { ComponentName } from "@/builder/types/components/componentMap";
import { componentSchemas } from "@/builder/types/components/componentSchemas";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsSchema";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsSchema";

/**
 * Validation functions for component props
 * These functions use the Zod schemas to validate component data
 */

/**
 * Validates content props for a specific component
 * @param componentName The name of the component
 * @param contentProps The content props to validate
 * @returns A validation result with success/error status and data/errors
 */
export const validateComponentContentProps = (
	componentName: ComponentName,
	contentProps: Partial<ComponentContentProps>,
) => {
	const schema = componentSchemas[componentName].contentProps;
	return schema.safeParse(contentProps);
};

/**
 * Validates style props for a specific component
 * @param componentName The name of the component
 * @param styleProps The style props to validate
 * @returns A validation result with success/error status and data/errors
 */
export const validateComponentStyleProps = (
	componentName: ComponentName,
	styleProps: Partial<ComponentStyleProps>,
) => {
	const schema = componentSchemas[componentName].styleProps;
	return schema.safeParse(styleProps);
};

/**
 * Validates both content and style props for a specific component
 * @param componentName The name of the component
 * @param props The component props to validate
 * @returns A validation result with success/error status and data/errors
 */
export const validateComponentProps = (
	componentName: ComponentName,
	props: {
		contentProps?: Partial<ComponentContentProps>;
		styleProps?: Partial<ComponentStyleProps>;
	},
) => {
	const contentResult = validateComponentContentProps(
		componentName,
		props.contentProps || {},
	);

	const styleResult = validateComponentStyleProps(
		componentName,
		props.styleProps || {},
	);

	// If both validations succeed, return success with the validated data
	if (contentResult.success && styleResult.success) {
		return {
			data: {
				contentProps: contentResult.data,
				styleProps: styleResult.data,
			},
			success: true,
		};
	}

	// If either validation fails, return error with the combined errors
	return {
		error: {
			contentProps: contentResult.success
				? undefined
				: contentResult.error,
			styleProps: styleResult.success ? undefined : styleResult.error,
		},
		success: false,
	};
};

/**
 * Type guard to check if a validation result is successful
 * @param result The validation result to check
 * @returns True if the validation was successful, false otherwise
 */
export const isValidationSuccess = <T>(
	result: z.SafeParseReturnType<unknown, T>,
): result is z.SafeParseSuccess<T> => {
	return result.success;
};

/**
 * Gets the formatted error messages from a validation error
 * @param error The Zod validation error
 * @returns An array of formatted error messages
 */
export const getValidationErrorMessages = (error: z.ZodError): string[] => {
	return error.errors.map((err) => {
		const path = err.path.join(".");
		return `${path}: ${err.message}`;
	});
};
