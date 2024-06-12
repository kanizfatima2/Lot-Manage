import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { unitDropdown } from "./components/dropDown";
import ManageLotModal from "./components/ManageLotModal";

const purchaseDefaultValue = {
  productName: "",
  discount: 0,
  tax: 0,
  subTotal: 100,
  quantity: [
    {
      id: "6639b84f5b8e534fa8da6d40",
      price: "",
      qty: "",
    },
    {
      id: "6639b8485b8e534fa8da6d3c",
      price: "",
      qty: "",
    },
  ],
  lot: {
    lotId1: {
      unitId1: 1,
      unitId2: 2,
    },
    lotId2: {
      unitId1: 5,
      unitId2: 3,
    },
  },
  selectedUnits: [],
};

function App() {
  const [show, setShow] = useState(false);
  const [isManageLotClicked, setIsManageLotClicked] = useState(false);

  const lots = [
    {
      id: 1,
      label: "Lot 1",
    },
    {
      id: 2,
      label: "Lot 2",
    },
    {
      id: 3,
      label: "Lot 3",
    },
  ];

  const schema = yup.object({
    productName: yup.string().required("Product name is Required"),
    // unit: yup.array().of(
    //   yup.object().shape({
    //     selected: yup.boolean(),
    //     quantity: yup.number().when("selected", {
    //       is: true,
    //       then: (schema) =>
    //         schema
    //           .required("Quantity is Required")
    //           // .min(1)
    //           .typeError("Quantity must be a number"),
    //       otherwise: (schema) => schema.notRequired(),
    //     }),
    //     purchasePrice: yup.number().when("selected", {
    //       is: true,
    //       then: (schema) =>
    //         schema
    //           .required("Purchase Price is Required")
    //           // .min(1)
    //           .typeError("Purchase Price must be a number"),
    //       otherwise: (schema) => schema.notRequired(),
    //     }),
    //   })
    // ),
    // .test(
    //   "at-least-one-selected",
    //   "At least one unit must be selected",
    //   (units) => {
    //     return units.some((unit) => {
    //       return unit.selected === true;
    //     });
    //   }
    // ),
    selectedUnits: yup
      .array()
      .of(yup.string())
      .test(
        "at-least-one-selected",
        "At least one unit must be selected",
        (units) => {
          // console.log(units);
          return units.some((unit) => {
            return unit;
          });
          // return units;
        }
      ),

    quantity: yup.array().of(
      yup.object().shape({
        qty: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .when(["selectedUnits"], {
            is: Array.selectedUnits,
            // is: (selectedUnits) => Array.selectedUnits,
            // is: (val) => console.log(val),
            // is: (selectedUnits) =>
            //   Array.selectedUnits &&
            //   selectedUnits &&
            //   !selectedUnits.includes(undefined),
            // is: Array.isArray,

            then: (schema) =>
              schema
                .required("Quantity is Required")
                .min(1, "Quantity is Required")
                .typeError("Quantity must be a number"),
            otherwise: (schema) => schema.notRequired(),
          }),

        // qty: yup
        //   .number()
        //   .transform((value) => (isNaN(value) ? undefined : value))
        //   .when("selectedUnits", (a, b, value) => {
        //     console.log(value);
        //   }),
      })
    ),

    discount: yup
      .number()
      .min(0, "Discount must be greater than to equal to 0")
      .typeError("Discount is Required"),
    tax: yup
      .number()
      .min(0, "Tax must be greater than or equal to 0")
      .typeError("Tax is Required"),
  });

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
    formState: { errors },
    clearErrors,
  } = methods;

  const selectedUnits = watch("selectedUnits");
  console.log(watch());
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleToggle = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  console.log("error:", errors);

  useEffect(() => {
    if (selectedUnits) {
      // console.log(selectedUnits);
      // selectedUnits?.forEach((unit) => {
      //   unit.selected === true && clearErrors(`selectedUnits`);
      // });
      watch("quantity").forEach((unit, index) => {
        // console.log(unit);
        if (selectedUnits.includes(unit?.id)) {
          clearErrors(`selectedUnits`);
        }
      });
    }
  }, [JSON.stringify(selectedUnits)]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table className="align-middle w-100">
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
              <tr>
                <td>
                  <input
                    type="text"
                    name="productName"
                    className={"mt-1"}
                    {...register("productName")}
                  />
                  {errors?.productName && (
                    <p className="text-danger">
                      {errors?.productName?.message}
                    </p>
                  )}
                </td>
                <td>
                  {unitDropdown.map((unit, index) => (
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
                                field.onChange(e.target.checked && unit.value)
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
                  ))}

                  {errors?.selectedUnits && (
                    <p className="text-danger">
                      {errors?.selectedUnits?.message}
                    </p>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    name="discount"
                    required={false}
                    className={"mt-1"}
                    {...register("discount")}
                  />
                  {errors?.discount && (
                    <p className="text-danger">{errors?.discount?.message}</p>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    name="tax"
                    required={false}
                    {...register("tax")}
                  />
                  {errors?.tax && (
                    <p className="text-danger">{errors?.tax?.message}</p>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    name="subTotal"
                    required={false}
                    className={"mt-1"}
                    disabled
                    {...register("subTotal")}
                  />
                </td>
                <td>
                  <Button variant="primary" onClick={handleToggle}>
                    Lot Manage
                  </Button>
                </td>
              </tr>

              {watch() &&
                watch("quantity")?.map((unit, index) => {
                  if (selectedUnits.includes(unit.id)) {
                    return (
                      <tr key={unit.id}>
                        <td></td>
                        <td></td>
                        <td>Quantity ({unitDropdown[index].label})</td>
                        <td>
                          <input
                            type="number"
                            name={`quantity[${index}].qty`}
                            required={false}
                            {...register(`quantity[${index}].qty`)}
                          />
                          {/* {errors?.product?.unit?.[index]?.quantity && (
            <p className="text-danger">
              {errors?.product?.unit?.[index]?.quantity?.message}
            </p>
          )} */}
                        </td>
                        <td>Purchase price ({unitDropdown[index].label})</td>
                        <td>
                          <input
                            type="number"
                            name={`quantity[${index}].price`}
                            required={false}
                            {...register(`quantity[${index}].price`)}
                          />
                          {/* {errors?.product?.unit?.[index]?.purchasePrice && (
            <p className="text-danger">
              {errors?.product?.unit?.[index]?.purchasePrice?.message}
            </p>
          )} */}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </Table>
          <div className="mt-5 text-center">
            <Button type="submit" variant="primary">
              {"submit"}
            </Button>
          </div>
        </form>
        {show && <ManageLotModal {...{ show, setShow, handleToggle, lots }} />}
      </FormProvider>
    </>
  );
}

export default App;
