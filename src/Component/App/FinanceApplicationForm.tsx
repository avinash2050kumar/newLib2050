import React, { useEffect, useMemo } from "react";
import { FlexCol, FlexRow } from "../Flex";
import { styled } from "@mui/system";
import {
  Button,
  Card,
  OutlinedInput,
  type Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Gutter } from "../Gutter";
import { Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BUSINESS_TYPE, BusinessType, CBFS_INITIAL_DATA } from "../../data";
import {
  convertCamelCaseToTitleCase,
  getArrayKeys,
  phoneNumPatternForLogin,
  removeArrays,
} from "../../helpers";
import { UploadAttachment } from "../Molecule/UploadAttachment";
import * as Yup from "yup";
import { useAppErrors } from "../../hooks";
import { FieldNumberInput, FieldTextInput } from "../Molecule";
import { Label } from "../Atoms/Label";
import { useLMS } from "../../Context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Wrapper = styled(FlexCol)`
  padding: 16px;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
`;

const Row = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Grid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  column-gap: 20px;
  row-gap: 20px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;

const PrimaryButtonWrapper = styled(FlexRow)``;

const StyledPrimaryButton = styled(Button)`
  min-width: 0;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 5px;
`;

const Col = styled(FlexCol)`
  width: 100%;
`;

const StyledRow = styled(FlexRow)`
  width: 100%;
  justify-content: flex-end;
`;

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular,
  };
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = Yup.object().shape({
  business: Yup.string().required("Business is required"),
  fullName: Yup.string().required("fullName is required"),
  email: Yup.string().required("email is required"),
  businessName: Yup.string().required("Business Name is required"),
  businessAddress: Yup.string().required("Business Address is required"),
  ntn: Yup.string().required("NTN is required"),
  contactNumber: Yup.string()
    .matches(phoneNumPatternForLogin, "Phone number is not valid")
    .min(10, "Phone number should be 10 digits long.")
    .max(10, "Phone number should be 10 digits long."),
  partnerCnic: Yup.array().when("businessType", {
    is: "partnership",
    then: Yup.array()
      .min(1, "Partner CNIC is required")
      .required("Partner CNIC is required"),
  }),
  partnershipDeed: Yup.array().when("businessType", {
    is: "partnership",
    then: Yup.array()
      .min(1, "Partnership deed is required")
      .required("Partnership deed is required"),
  }),
  incorporationCertificate: Yup.array().when("businessType", {
    is: "partnership",
    then: Yup.array()
      .min(1, "Incorporation certificate is required")
      .required("Incorporation certificate is required"),
  }),
  authorityLetter: Yup.array().when("businessType", {
    is: "partnership",
    then: Yup.array()
      .min(1, "Authority letter is required")
      .required("Authority letter is required"),
  }),
  directorsResolution: Yup.array().when("businessType", {
    is: "company",
    then: Yup.array()
      .min(1, "Directors resolution is required")
      .required("Directors resolution is required"),
  }),
  memorandumArticlesAssociation: Yup.array().when("businessType", {
    is: "company",
    then: Yup.array()
      .min(1, "Memorandum articles association is required")
      .required("Memorandum articles association is required"),
  }),
  boardMemberCnic: Yup.array().when("businessType", {
    is: "company",
    then: Yup.array()
      .min(1, "Board member CNIC is required")
      .required("Board member CNIC is required"),
  }),
  pocCnic: Yup.array().when("businessType", {
    is: "company",
    then: Yup.array()
      .min(1, "POC CNIC is required")
      .required("POC CNIC is required"),
  }),
  beneficialOwnerCnic: Yup.array().when("businessType", {
    is: "company",
    then: Yup.array()
      .min(1, "Beneficial owner CNIC is required")
      .required("Beneficial owner CNIC is required"),
  }),
  cnicFront: Yup.array().when("businessType", {
    is: "soleProprietorship",
    then: Yup.array()
      .min(1, "CNIC front is required")
      .required("CNIC front is required"),
  }),
  cnicBack: Yup.array().when("businessType", {
    is: "soleProprietorship",
    then: Yup.array()
      .min(1, "CNIC back is required")
      .required("CNIC back is required"),
  }),
  proprietorshipDeclaration: Yup.array().when("businessType", {
    is: "soleProprietorship",
    then: Yup.array()
      .min(1, "Proprietorship declaration is required")
      .required("Proprietorship declaration is required"),
  }),
  ntnCertificate: Yup.array().when("businessType", {
    is: "soleProprietorship",
    then: Yup.array()
      .min(1, "NTN certificate is required")
      .required("NTN certificate is required"),
  }),
  bankStatement: Yup.array().when("businessType", {
    is: "soleProprietorship",
    then: Yup.array()
      .min(1, "Bank statement is required")
      .required("Bank statement is required"),
  }),
});

export const FinanceApplicationForm = () => {
  const { axiosInstance } = useLMS();
  const theme = useTheme();
  const { setAppError } = useAppErrors();

  const initial = useMemo(() => {
    return {
      ...CBFS_INITIAL_DATA,
      businessName: "",
      email: "",
      fullName: "",
      phone: "",
      businessAddress: "",
      business: "",
      contactNumber: "",
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/auth/partners/login", {
        partnerId: "65a6696c888d21a7b4b50e64",
        apiKey: "1234",
      });
      console.log("reslms", res);
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (value: any, action: any) => {
    try {
      action.setSubmitting(true);

      /*await registerInCBFS({
                    ...value,
                    contactNumber: '+92' + value.contactNumber
                })*/
      //const res = await getProfileStatus('')
      //dispatch(setCBFSInfo(res))
      //navigate('/ordr-financing')

      /*await updateCBFS({
                    ...value,
                    contactNumber: '+92' + value.contactNumber
                })
                const res = await getProfileStatus(business)
                dispatch(setCBFSInfo(res))
                navigate('/ordr-financing')*/
    } catch (e: any) {
      setAppError(e);
    } finally {
      action.setSubmitting(false);
    }
  };

  return (
    <Card variant={"outlined"}>
      <Wrapper>
        <Formik
          initialValues={initial}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
            setValues,
            errors,
            isValid,
          }) => (
            <>
              <Row>
                <Col>
                  <Typography variant={"h6"} fontWeight={600}>
                    Register for Financing
                  </Typography>
                  <Typography variant={"body2"}>
                    For helping us understand your business better, please
                    provide the required detail
                  </Typography>
                </Col>
              </Row>
              <Col>
                <Gutter spacing={2} />
              </Col>
              <Col>
                <Grid>
                  <FieldTextInput
                    placeholder="Enter Name"
                    name={"fullName"}
                    title="Full Name"
                    wrapperStyle={{ width: "100%" }}
                    style={{
                      width: "100%",
                    }}
                    size="small"
                  />

                  <FieldNumberInput
                    title="Contact Number"
                    placeholder={"03001XXXXXX"}
                    name={"contactNumber"}
                    wrapperStyle={{ width: "100%" }}
                    style={{
                      width: "100%",
                    }}
                    size="small"
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={{
                            marginRight: 1.1,
                            marginTop: -0.1,
                          }}
                        >
                          +92
                        </Typography>
                      ),
                    }}
                  />
                  <FieldTextInput
                    placeholder="Enter Name"
                    name={"email"}
                    wrapperStyle={{ width: "100%" }}
                    style={{
                      width: "100%",
                    }}
                    title="Email"
                    size="small"
                  />
                  <FieldTextInput
                    placeholder="Business Name"
                    name={"businessName"}
                    wrapperStyle={{ width: "100%" }}
                    title="Business Name"
                    style={{
                      width: "100%",
                    }}
                    size="small"
                  />
                  <Col>
                    <Label>Business Type</Label>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={values.businessType}
                      onChange={(event) => {
                        setValues({
                          ...(removeArrays(values) as any),
                          businessType: event.target.value,
                          ...BusinessType[
                            event.target.value as
                              | "partnership"
                              | "company"
                              | "soleProprietorship"
                          ],
                        } as any);
                      }}
                      input={
                        <OutlinedInput
                          size={"small"}
                          sx={{
                            width: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      }
                      MenuProps={MenuProps}
                    >
                      {BUSINESS_TYPE.map((name) => (
                        <MenuItem
                          key={name.name}
                          value={name.value}
                          style={getStyles(theme)}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Col>
                  <FieldTextInput
                    placeholder="Ntn"
                    name={"ntn"}
                    wrapperStyle={{ width: "100%" }}
                    title="NTN"
                    style={{
                      width: "100%",
                    }}
                    size="small"
                  />
                </Grid>
                <Gutter />
                <FieldTextInput
                  multiline
                  title={"Business Address"}
                  rows={2}
                  wrapperStyle={{ width: "100%" }}
                  name="businessAddress"
                  placeholder={"Business Address"}
                  size="small"
                  style={{ width: "100%" }}
                />
                <Gutter spacing={1.5} />
              </Col>
              <FieldTextInput
                title={"Bank Details"}
                name="bankName"
                wrapperStyle={{ width: "100%" }}
                placeholder={"Business Name"}
                size="small"
                style={{ width: "100%" }}
              />
              <Gutter />
              <FieldTextInput
                name="bankDetail"
                placeholder={"Business Detail"}
                size="small"
                wrapperStyle={{ width: "100%" }}
                title={"Bank Details"}
                style={{ width: "100%" }}
              />
              <Gutter spacing={1.5} />

              <Typography variant={"body1"} fontWeight={600}>
                Upload Attachment
              </Typography>
              <Gutter spacing={0.7} />
              {getArrayKeys(values).map((m) => {
                return (
                  <Col key={m}>
                    <UploadAttachment
                      name={m}
                      title={`${convertCamelCaseToTitleCase(m)}*`}
                    />
                  </Col>
                );
              })}
              <StyledRow>
                <StyledPrimaryButton
                  variant={"contained"}
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || !isValid}
                >
                  <PrimaryButtonWrapper>Submit</PrimaryButtonWrapper>
                </StyledPrimaryButton>
              </StyledRow>
            </>
          )}
        </Formik>
      </Wrapper>
    </Card>
  );
};
