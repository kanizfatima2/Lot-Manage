import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { productDropdown, unitDropdown } from "./components/dropDown";
import ManageLotModal from "./components/ManageLotModal";
import Select from "react-select";
import { TbEdit } from "react-icons/tb";
import { convertArrayToObjectKeys } from "./utils/convertArrraytoObjectKeys";
import { RiCornerUpRightLine } from "react-icons/ri";

const purchaseDefaultValue = {
  selectedProducts: [],
};

function App() {
  const [show, setShow] = useState(false);

  const schema = yup
    .object({
      selectedProducts: yup
        .array()
        .of(
          yup.object().shape({
            discount: yup
              .number()
              .required("Discount is Required")
              .min(1, "Discount must be greater than or equal to 0")
              .typeError("Discount is Required"),
            tax: yup
              .number()
              .required("Tax is Required")
              .min(1, "Tax must be greater than or equal to 0")
              .typeError("Tax is Required"),
          })
        )
        .required("Selected products are required")
        .test(
          "length",
          "Selected products must contain exactly one product",
          (val) => val.length === 1
        ),
    })
    .required();

  const methods = useForm({
    defaultValues: purchaseDefaultValue,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = methods;

  const {
    fields: productFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "selectedProducts",
  });

  const convertedUnit = convertArrayToObjectKeys(unitDropdown);

  const selectedProducts = watch("selectedProducts");

  console.log(watch());

  const findUnits = (unitDropdown, value, productDropdown) => {
    let units = [];

    productDropdown.forEach((product) => {
      if (product.value === value.value) {
        units = unitDropdown
          .filter((unitItem) =>
            Object.keys(product.totalAvailable || {}).includes(unitItem.value)
          )
          .map((unitItem) => ({
            value: unitItem.value,
            label: unitItem.label,
          }));
      }
    });

    return units;
  };

  const handleToggle = (productId, productIndex, product) => {
    if (show) {
      setShow(false);
    } else {
      setShow({ productId, productIndex, product });
    }
  };

  const handleSelectProduct = (e, actionMeta) => {
    if (actionMeta.action === "select-option") {
      const alreadySelected = productFields.findIndex(
        (productField) => productField?.value === actionMeta.option.value
      );

      const selectedUnit = findUnits(
        unitDropdown,
        { ...actionMeta.option },
        productDropdown
      );

      if (alreadySelected === -1) {
        append({ ...actionMeta.option, selectedUnit, discount: 0, tax: 0 });
      }
    }

    if (actionMeta.action === "remove-value") {
      const selectedProduct = productFields.findIndex(
        (productField) => productField?.value === actionMeta.removedValue.value
      );
      if (selectedProduct !== -1) {
        remove(selectedProduct);
      }
    }
  };

  // const handleSelectedUnit = (e, unit, productIndex,unitIndex) => {
  //   console.log(e.target.checked);
  //   setValue(`selectedProducts[`productIndex`].selectedUnit[unitIndex]`);
  // };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  console.log("error:", errors);

  // useEffect(() => {
  //   if (selectedUnits) {
  //     // selectedUnits?.forEach((unit) => {
  //     //   unit.selected === true && clearErrors(`selectedUnits`);
  //     // });
  //     watch("quantity")?.forEach((unit, index) => {
  //       if (selectedUnits.includes(unit?.id)) {
  //         clearErrors(`selectedUnits`);
  //       }
  //     });
  //   }
  // }, [JSON.stringify(selectedUnits)]);

  // useEffect(() => {
  //   errors?.quantity?.map((item) => {
  //     if (item.ref != "input") {
  //
  //     }
  //   });
  // }, []);

  return (
    <>
      <FormProvider {...methods}>
        <div className="d-flex justify-content-center mt-5">
          <div className="col-lg-9">
            <p className="fw-bold mt-3 mb-1 fs-6"> Select Product</p>
            <Select
              isMulti
              name={"selectProducts"}
              options={productDropdown}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Products"
              onChange={(e, actionMeta) => handleSelectProduct(e, actionMeta)}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="fw-bold mt-3 mb-1 fs-6">Product Table</p>
              <Table className="align-middle w-100 text-center" bordered>
                <thead className="text-dark">
                  <tr>
                    <th className="text-center">{"Product Name"}</th>
                    <th className="text-center">{"Unit"}</th>
                    <th className="text-center">{"Discount"}</th>
                    <th className="text-center">{"Tax"}</th>
                    <th className="text-center">{"Sub total"}</th>
                    <th className="text-center">{"Action"}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts?.map((product, productIndex) => (
                    <>
                      <tr>
                        <td>
                          {/* <input
                        type="text"
                        name="productName"
                        className={"mt-1"}
                        {...register("productName")}
                      />
                      {errors?.productName && (
                        <p className="text-danger">
                          {errors?.productName?.message}
                        </p>
                      )} */}
                          {product?.label}
                        </td>

                        <td className="text-start">
                          {product?.selectedUnit?.map((unit, unitIndex) => {
                            return (
                              <div key={unitIndex}>
                                {/* <Controller
                                    control={control}
                                    name={`selectedUnits`}
                                    render={({ field }) => (
                                      <>
                                        <input
                                          {...field}
                                          id={index}
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={field.value || false}
                                          onChange={(e) =>
                                            field.onChange(
                                              e.target.checked && unit
                                            )
                                          }
                                        />
                                        <label
                                          className="form-check-label ms-2"
                                          htmlFor={index}
                                        >
                                          {convertedUnit[unit]}
                                        </label>
                                      </>
                                    )}
                                  /> */}

                                <input
                                  id={`selectedProducts[${productIndex}].selectedUnit[${unitIndex}]`}
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={unit.checked || false}
                                  onChange={(e) =>
                                    setValue(
                                      `selectedProducts[${productIndex}].selectedUnit[${unitIndex}].checked`,
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={unit}
                                >
                                  {convertedUnit[unit.value]}
                                </label>
                              </div>
                            );
                          })}
                          {/* {unitDropdown.map((unit, index) => (
                        <div key={unit.value}>
                          <Controller
                            control={control}
                            name={`selectedUnits[${index}]`}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  id={unit.value}
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={field.value || false}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.checked && unit.value
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={unit.value}
                                >
                                  {unit.label}
                                </label>
                              </>
                            )}
                          />
                        </div>
                      ))} */}

                          {/* {errors?.selectedUnits && (
                        <p className="text-danger">
                          {errors?.selectedUnits?.message}
                        </p>
                      )} */}
                        </td>
                        <td>
                          <input
                            type="number"
                            name={`selectedProducts[${productIndex}].discount`}
                            // required={true}
                            className={"mt-1"}
                            {...register(
                              `selectedProducts[${productIndex}].discount`
                            )}
                          />
                          {errors?.selectedProducts?.[`${productIndex}`] && (
                            <p className="text-danger">
                              {
                                errors?.selectedProducts?.[`${productIndex}`]
                                  ?.discount?.message
                              }
                            </p>
                          )}
                        </td>
                        <td>
                          <input
                            type="number"
                            name={`selectedProducts[${productIndex}].tax`}
                            // required={true}
                            {...register(
                              `selectedProducts[${productIndex}].tax`
                            )}
                          />
                          {errors?.selectedProducts?.[`${productIndex}`] && (
                            <p className="text-danger">
                              {
                                errors?.selectedProducts?.[`${productIndex}`]
                                  ?.tax?.message
                              }
                            </p>
                          )}
                        </td>
                        <td>
                          <input
                            type="number"
                            name={`selectedProducts[${productIndex}].subTotal`}
                            required={false}
                            className={"mt-1"}
                            disabled
                            // {...register(
                            //   `selectedProducts[${productIndex}].subTotal`
                            // )}
                            value={200}
                          />
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              handleToggle(
                                product?.value,
                                productIndex,
                                product
                              )
                            }
                          >
                            <TbEdit />
                          </Button>
                        </td>
                      </tr>

                      {product?.selectedUnit?.map(
                        (item, unitIndex) =>
                          item.checked &&
                          !show && (
                            <>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>
                                  Quantity{" "}
                                  <pre className="text-primary">
                                    ({item.label})
                                  </pre>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name={`selectedProducts[${productIndex}].selectedUnit[${unitIndex}].quantity`}
                                    required={false}
                                    {...register(
                                      `selectedProducts[${productIndex}].selectedUnit[${unitIndex}].quantity`
                                    )}
                                  />
                                  {/* {errors?.quantity?.[index]?.qty && (
                            <p className="text-danger">
                              {errors?.quantity?.[index]?.qty?.message}
                            </p>
                          )} */}
                                </td>

                                <td>
                                  Purchase price{" "}
                                  <pre className="text-primary">
                                    ({item.label})
                                  </pre>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name={`selectedProducts[${productIndex}].selectedUnit[${unitIndex}].purchasePrice`}
                                    required={false}
                                    {...register(
                                      `selectedProducts[${productIndex}].selectedUnit[${unitIndex}].purchasePrice`
                                    )}
                                  />
                                  {/* {errors?.quantity?.[index]?.price && (
                            <p className="text-danger">
                              {errors?.quantity?.[index]?.price?.message}
                            </p>
                          )} */}
                                </td>
                              </tr>
                            </>
                          )
                      )}
                    </>
                  ))}

                  {/* {
                    product?.map((unit, index) => {
                      if (selectedUnits.includes(unit.id)) {
                        return (
                          <tr key={unit.id}>
                            <td></td>
                            <td></td>
                            <td>
                              Quantity{" "}
                              <pre className="text-primary">
                                ({unitDropdown[index].label})
                              </pre>
                            </td>
                            <td>
                              <input
                                type="number"
                                name={`quantity[${index}].qty`}
                                required={false}
                                {...register(`quantity[${index}].qty`)}
                              />
                              {errors?.quantity?.[index]?.qty && (
                                <p className="text-danger">
                                  {errors?.quantity?.[index]?.qty?.message}
                                </p>
                              )}
                            </td>

                            <td>
                              Purchase price{" "}
                              <pre className="text-primary">
                                ({unitDropdown[index].label})
                              </pre>
                            </td>
                            <td>
                              <input
                                type="number"
                                name={`quantity[${index}].price`}
                                required={false}
                                {...register(`quantity[${index}].price`)}
                              />
                              {errors?.quantity?.[index]?.price && (
                                <p className="text-danger">
                                  {errors?.quantity?.[index]?.price?.message}
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })} */}
                </tbody>
              </Table>

              <div className="mt-5 text-center">
                <Button type="submit" variant="primary">
                  {"submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {show && <ManageLotModal {...{ show, setShow, handleToggle }} />}
      </FormProvider>
    </>
  );
}

export default App;
