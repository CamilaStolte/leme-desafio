import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";

import type { Entidade } from "../types/entities";

type Props = {
  open: boolean;
  onClose: () => void;
  entidade: Entidade | null;
};

export function DetalhesModal({ open, onClose, entidade }: Props) {
  if (!entidade) return null;

  const getAvatarText = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
          width: { xs: "95%", sm: "90%", md: "80%" },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor:
                  entidade.tipo === "PF" ? "primary.main" : "secondary.main",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                mr: 2,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 600,
              }}
            >
              {getAvatarText(entidade.nome)}
            </Avatar>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {entidade.nome}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          {entidade.tipo === "PF" ? (
            <>
              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Informações Pessoais
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                  gap={2}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      CPF
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.cpf}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Sexo
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.sexo}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Data de Nascimento
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.dataNascimento}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Nome da Mãe
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.nomeMae}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Telefones
                </Typography>
                {entidade.telefones.map((telefone, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.telefones.length - 1 ? 1 : 0}
                  >
                    {telefone.numero}
                  </Typography>
                ))}
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  E-mails
                </Typography>
                {entidade.emails.map((email, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.emails.length - 1 ? 1 : 0}
                  >
                    {email}
                  </Typography>
                ))}
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Endereços
                </Typography>
                {entidade.enderecos.map((endereco, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.enderecos.length - 1 ? 1 : 0}
                  >
                    {`${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`}
                  </Typography>
                ))}
              </Paper>
            </>
          ) : (
            <>
              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Informações da Empresa
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                  gap={2}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      CNPJ
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.cnpj}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Capital Social
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.capitalSocial}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Data de Início
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.dataInicioAtividades}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Situação
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.situacaoCadastral}
                    </Typography>
                  </Box>
                  <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      CNAE Principal
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {entidade.cnaePrincipal}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Telefones
                </Typography>
                {entidade.telefones.map((telefone, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.telefones.length - 1 ? 1 : 0}
                  >
                    {telefone.numero}
                  </Typography>
                ))}
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  E-mails
                </Typography>
                {entidade.emails.map((email, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.emails.length - 1 ? 1 : 0}
                  >
                    {email}
                  </Typography>
                ))}
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Endereços
                </Typography>
                {entidade.enderecos.map((endereco, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.enderecos.length - 1 ? 1 : 0}
                  >
                    {`${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`}
                  </Typography>
                ))}
              </Paper>

              <Paper
                elevation={1}
                sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2}
                  color="primary"
                >
                  Quadro Societário
                </Typography>
                {entidade.quadroSocietario.map((socio, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    mb={index < entidade.quadroSocietario.length - 1 ? 1 : 0}
                  >
                    {socio.nome} - CPF: {socio.cpf}
                  </Typography>
                ))}
              </Paper>
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
