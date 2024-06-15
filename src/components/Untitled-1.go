<tr>
                                      <th className="text-center bg-light">
                                        {"Unit"}
                                      </th>
                                      <th className="text-center bg-light">
                                        {"Quantity"}
                                      </th>
                                      <th className="text-center bg-light">
                                        {"Purchase price"}
                                      </th>
                                    </tr>
                                    
                                          {/* <tr
                                            key={`${index}-${unitIndex}`}
                                            className="text-center"
                                          >
                                            <td>{unit.label}</td>
                                            <td>
                                              <input
                                                type="number"
                                                required={false}
                                                className={"mt-1"}
                                                name={`selectedLots[${index}].${unit.value}`}
                                                {...register(
                                                  `selectedLots[${index}].${unit.value}`
                                                )}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                required={false}
                                                className={"mt-1"}
                                              />
                                            </td>
                                          </tr> */}




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
    // selectedUnits: yup
    //   .array()
    //   .of(yup.string())
    //   .test(
    //     "at-least-one-selected",
    //     "At least one unit must be selected",
    //     (units) => {
    //       return units.some((unit) => {
    //         return unit;
    //       });
    //     }
    //   ),

    quantity: yup.array().of(
      yup.object().shape({
        // qty: yup
        //   .number()
        //   .transform((value) => (isNaN(value) ? undefined : value))
        //   .when(["selectedUnits"], {
        //     is: Array.selectedUnits,
        //     // is: (selectedUnits) => Array.selectedUnits,
        //     // is: (val) => console.log(val),
        //     // is: (selectedUnits) =>
        //     //   Array.selectedUnits &&
        //     //   selectedUnits &&
        //     //   !selectedUnits.includes(undefined),
        //     // is: Array.isArray,
        //     then: (schema) =>
        //       schema
        //         .required("Quantity is Required")
        //         .min(1, "Quantity is Required")
        //         .typeError("Quantity must be a number"),
        //     otherwise: (schema) => schema.notRequired(),
        //   }),
        // qty: yup
        //   .number()
        //   .transform((value) => (isNaN(value) ? undefined : value))
        //   .when("selectedUnits", (a, b, value) => {
        //     if (
        //       // value?.from?.[1]?.value?.selectedUnits?.map((x) =>
        //       //   value?.from?.[1]?.value?.quantity?.find((item) => {
        //       //     if (item.id === x) {
        //       //       return x;
        //       //     }
        //       //   })
        //       // )
        //       value?.from?.[1]?.value?.selectedUnits?.some.call(
        //         selectedUnits,
        //         (x) => typeof x === "string"
        //       )
        //     )
        // console.log(value?.from?.[1]?.value?.quantity?.find((item)=>console.log(item.id)))
        //     return yup
        //       .number()
        //       .required("Quantity is Required")
        //       .min(1, "Quantity must be greater than 0")
        //       .typeError("Quantity must be a number");
        // }),
        // price: yup
        //   .number()
        //   .transform((value) => (isNaN(value) ? undefined : value))
        //   .when("selectedUnits", (a, b, value) => {
        //     if (
        //       value?.from?.[1]?.value?.selectedUnits?.some.call(
        //         selectedUnits,
        //         (x) => typeof x === "string"
        //       )
        //     ) {
        //       return yup
        //         .number()
        //         .required("Purchase Price is Required")
        //         .min(1, "Purchase price must be greater than 0")
        //         .typeError("Purchase Price must be a number");
        //     }
        //   }),
      })
    ),
    // .test(
    //   "at-least-one-selected",
    //   "At least one unit must be selected",
    //   (units) => {
    //     return units.some((unit) => {
    //       return unit;
    //     });
    //   }
    // ),